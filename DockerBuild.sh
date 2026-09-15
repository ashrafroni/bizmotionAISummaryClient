#!/bin/bash
set -euo pipefail
# Variables
DOCKER_USERNAME="bizmotionadmin"
DOCKER_PASSWORD="ssnr@motion"
DOCKER_IMAGE_NAME="summaryai-web"
DOCKER_IMAGE_TAG="${1:-latest}"

# Check if the DOCKER_IMAGE_TAG is "latest"
if [ "${DOCKER_IMAGE_TAG}" == "latest" ]; then
  git checkout main
  git pull
fi

# Clean up the dist folder
rm -rf dist

# Build
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm use v14.21.3

pnpm install
pnpm run build

IMAGE_BASE="${DOCKER_USERNAME}/${DOCKER_IMAGE_NAME}"
FINAL_TAG="${IMAGE_BASE}:${DOCKER_IMAGE_TAG}"

AMD_TAG="${FINAL_TAG}-amd64"
ARM_TAG="${FINAL_TAG}-arm64"

echo "======================================"
echo "Building multi-arch image"
echo "Base: ${IMAGE_BASE}"
echo "Tag : ${DOCKER_IMAGE_TAG}"
echo "======================================"

# =========================
# Register QEMU for cross-platform builds (Linux only — Docker Desktop handles this on Mac)
# =========================
if [[ "$(uname)" == "Linux" ]]; then
  echo ">> Registering QEMU binfmt handlers ..."
  docker run --privileged --rm tonistiigi/binfmt --install all
fi

# =========================
# BUILD AMD64
# =========================
echo ">> Building linux/amd64 ..."
docker buildx build \
  --platform linux/amd64 \
  -t "${AMD_TAG}" \
  --load .

# =========================
# BUILD ARM64
# =========================
echo ">> Building linux/arm64 ..."
docker buildx build \
  --platform linux/arm64 \
  -t "${ARM_TAG}" \
  --load .


# =========================
# Log in to Docker Hub
# =========================
echo "$DOCKER_PASSWORD" | docker login -u "${DOCKER_USERNAME}" --password-stdin

# =========================
# PUSH IMAGES
# =========================
echo ">> Pushing amd64 image ..."
docker push "${AMD_TAG}"

echo ">> Pushing arm64 image ..."
docker push "${ARM_TAG}"

# =========================
# CREATE AND PUSH MANIFEST
# =========================
echo ">> Creating manifest for ${FINAL_TAG} ..."

# imagetools create handles manifest-list sources (produced by buildx --load)
# and pushes atomically — no separate push step needed
docker buildx imagetools create \
  -t "${FINAL_TAG}" \
  "${AMD_TAG}" \
  "${ARM_TAG}"

# =========================
# VERIFY
# =========================
echo ">> Inspecting manifest ..."
docker manifest inspect "${FINAL_TAG}"

echo "======================================"
echo "DONE ✔ Multi-arch image published:"
echo "${FINAL_TAG}"
echo "======================================"


# =========================
# Logout from Docker Hub
# =========================
docker logout

if [ "${DOCKER_IMAGE_TAG}" == "latest" ]; then
  git checkout develop
fi
