<script lang="ts">
  import BaseProblemBlock from "./BaseProblemBlock.svelte";
  import NotFoundIcon from "./NotFoundIcon.svelte";
</script>

<BaseProblemBlock
  title="Что-то пошло не так..."
  description="Упс! Кажется поисковый робот сломался. Мы сохранили и перадали запрос на анализ в ай-ти отдел."
>
  <NotFoundIcon slot="icon" />
  <div>Попробуйте обновить страницу и изменить поисковый запрос.</div>
  <div>Доложно сработать!</div>
</BaseProblemBlock>
