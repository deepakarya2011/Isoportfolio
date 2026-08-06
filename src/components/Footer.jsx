export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '28px 0',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: 'var(--color-text-dimmer)',
          letterSpacing: '0.01em',
        }}
      >
        &copy; 2026 Deepak Arya. All Rights Reserved.
      </span>
    </footer>
  )
}
