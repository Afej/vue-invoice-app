<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
    <div class="end flex">
      <div class="toggle flex">
        <!-- <img src="@/assets/profile.png" alt="" /> -->
      </div>
      <div class="profile flex">
        <img src="@/assets/profile.png" alt="" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang='scss' scoped>
header {
  z-index: 99;
  flex-direction: row;
  justify-content: space-between;
  background-color: #1e2139;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;

    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      width: auto;
      height: 30px;
    }
  }

  .end {
    @media (min-width: 900px) {
      flex-direction: column;
    }

    .profile {
      padding: 24px;

      @media (min-width: 900px) {
        border-top: 1px solid #888eb0;
        width: 100%;
      }

      @media (max-width: 800px) {
        border-left: 1px solid #888eb0;
      }

      img {
        width: auto;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>