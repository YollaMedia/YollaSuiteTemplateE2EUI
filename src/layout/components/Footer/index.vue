<template>
  <div class="page-footer">
    <div class="page-footer-link">
      <a href="http://www.yollamedia.com" target="_blank">YOLLA</a>
      <span> © 2022</span>
    </div>
    <div class="copyright"> Yolla E2E Dashboard v1.0.0 </div>
  </div>
</template>

<script>
  export default {
    name: 'PageFooter',
    components: {},
    props: {
      collapsed: {
        type: Boolean,
      },
    },
  };
</script>

<style lang="less" scoped>
  .page-footer {
    display: flex;
    justify-content: space-between;
    //margin: 28px 0 24px 0;
    // padding: 0 16px;
    text-align: center;

    a {
      font-size: 14px;
      color: #ff3c04;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #b72900;
      }
    }

    &-link {
      display: flex;
      justify-content: center;
      // margin-bottom: 8px;

      a:not(:last-child) {
        margin-right: 12px;
      }
    }

    .copyright {
      color: #808695;
      font-size: 14px;
    }
  }
</style>
