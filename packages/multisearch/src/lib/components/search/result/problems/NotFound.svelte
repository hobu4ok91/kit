<script lang="ts">
  import BaseProblemBlock from "./BaseProblemBlock.svelte";
  import NotFoundIcon from "./NotFoundIcon.svelte";
</script>

<BaseProblemBlock
  title="Ничего не найдено 😕"
  description="Кажется, наш поиск не может ничего предложить по вашему запросу."
>
  <NotFoundIcon slot="icon" />
  Попробуйте упростить или написать иначе...
  <div slot="after" style="max-width: 850px;">
    В большинстве случаев поиск справляется со своими задачами, но иногда
    заходит в тупик. Причин может быть несколько. Например, мы ещё не успели
    заполнить характеристики товара или название товара не содержит детальной
    информации, которую вы пытаетесь получить.
  </div>
</BaseProblemBlock>
