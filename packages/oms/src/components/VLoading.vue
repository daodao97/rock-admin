<template>
  <!--  <Suspense>-->
  <!--    <template #default>-->
  <slot/>
  <!--    </template>-->
  <!--    <template #fallback>-->
  <!--      <div class="loading">-->
  <!--        <div class="loading-inner" />-->
  <!--      </div>-->
  <!--    </template>-->
  <!--  </Suspense>-->
</template>
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  z-index: 1000;
}

.loading .loading-inner {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 70px;
  height: 70px;
  margin: -35px 0 0 -35px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3498db;
  animation: spin 2s linear infinite;
}

.loading .loading-inner:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #e74c3c;
  animation: spin 3s linear infinite;
}

.loading .loading-inner:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #f9c922;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }

}
</style>
