export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-soft)',
        background: 'linear-gradient(180deg, rgba(12, 13, 15, 0.30) 0%, rgba(12, 13, 15, 0.92) 100%)',
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
