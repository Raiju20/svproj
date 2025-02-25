<script lang="ts">
  import { Accordion } from "bits-ui";
</script>

<h1>junk</h1>

<Accordion.Root>
	<Accordion.Item>
		<Accordion.Header>
			<Accordion.Trigger>First</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content>     
      <div>
        The forceMount prop ensures the components are always in the DOM. The
        child snippet provides access to the open state and component props.
        Svelte's #if block controls when the content is visible. Transition
        directives (transition:fade and transition:fly) apply the animations.
      </div>
    </Accordion.Content>
	</Accordion.Item>
	<Accordion.Item>
		<Accordion.Header>
			<Accordion.Trigger>Second</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content>Second accordion content</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item>
		<Accordion.Header>
			<Accordion.Trigger>Third</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content>Third accordion content</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

<p>this is the junk page.</p>

<style>
  :global(div[data-accordion-root]) {
    width: 75%;
    margin: auto;
  }

  :global([data-accordion-trigger]) {
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
  /*
:global([data-accordion-content]) {
  overflow: hidden; 

  transition: all 0.3s ease-out; 
}
*/

  :global(div[data-accordion-content][data-state="open"]) {
    background: rgb(111, 181, 221);
    animation: slide-down 0.73s ease-out;
    max-height: 500px;
    opacity: 1;
  }

  :global([data-accordion-content][data-state="closed"]) {
    background: blue;
    animation: slide-up 0.73s ease-out; /* Анимация закрытия */
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  /* Анимация раскрытия */
  @keyframes slide-down {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 1000px;
      opacity: 1;
    }
  }

  /* Анимация скрытия */
  @keyframes slide-up {
    from {
      max-height: 1000px;
      opacity: 1;
    }
    to {
      max-height: 0;
      opacity: 0;
    }
  }


</style>