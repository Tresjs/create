<script setup lang="ts">
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresPerspectiveCamera
    :position="[10, 10, 10]"
    :look-at="[0, 0, 0]"
  />
  <TresAmbientLight
    :intensity="0.5"
    color="white"
  />
  <TresDirectionalLight
    :position="[0, 8, 4]"
    :intensity="1"
    cast-shadow
  />

  <!-- Physics loads Rapier's wasm asynchronously, so it needs a Suspense boundary -->
  <Suspense>
    <Physics>
      <RigidBody
        collider="ball"
        :restitution="0.8"
      >
        <TresMesh :position="[0, 8, 0]">
          <TresSphereGeometry :args="[1, 32, 32]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </RigidBody>

      <RigidBody type="fixed">
        <TresMesh>
          <TresPlaneGeometry
            :args="[20, 20]"
            :rotate-x="-Math.PI / 2"
          />
          <TresMeshBasicMaterial color="#f4f4f4" />
        </TresMesh>
      </RigidBody>
    </Physics>
  </Suspense>
</template>
