const WORKFLOW_STEPS = [
  { label: 'Understand', number: '01', state: 'dim' },
  { label: 'Visualize', number: '02', state: 'active' },
  { label: 'Iterate', number: '03', state: 'active' },
  { label: 'Execute', number: '04', state: 'dim' },
] as const

export function InteriorWorkflowSlide() {
  return (
    <article className="interior-workflow-slide">
      <section className="interior-workflow-slide__copy">
        <p>
          <span>Interior designers do all of this.</span>
          <span>Ohouse has been replicating each step.</span>
        </p>
        <p>
          <span>AI now handles the hardest part:</span>
          <span>visualizing and iterating before anyone commits.</span>
        </p>
      </section>

      <section
        className="interior-workflow-slide__workflow"
        aria-label="Interior design workflow"
      >
        <p className="interior-workflow-slide__eyebrow">
          Interior design journey
        </p>
        {WORKFLOW_STEPS.map((step) => (
          <div
            className="interior-workflow-slide__step"
            data-state={step.state}
            key={step.label}
          >
            <span>{step.number}</span>
            <p>{step.label}</p>
          </div>
        ))}
      </section>
    </article>
  )
}
