<script lang="ts">
  export let title: string
  export let className: string
  export let isPaddingTop: boolean
</script>

<div class="card {isPaddingTop ? 'card-mt' : ''} {className}">
  {#if title}
    <h4>{title}</h4>
  {/if}
  <slot />
</div>

<style lang="less">
  .card {
    padding: 18px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 2, 4, 0.06), 0 0 1px rgba(0, 2, 4, 0.11);
  }
  .card h4 {
    font-weight: normal;
    color: #6b7f94;
  }
  .card-mt {
    margin-top: 20px;
  }
</style>
