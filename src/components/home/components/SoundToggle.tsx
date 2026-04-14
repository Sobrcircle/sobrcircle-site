import { useAmbientSound } from '../hooks/useAmbientSound'

type Props = {
  onToggle?: () => void
}

export default function SoundToggle({ onToggle }: Props) {
  const { enabled, toggle } = useAmbientSound()

  const handle = () => {
    toggle()
    onToggle?.()
  }

  return (
    <button
      type="button"
      className={`home-sound-toggle ${enabled ? 'is-on' : ''}`}
      onClick={handle}
      aria-label={enabled ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={enabled}
    >
      <span className="home-sound-toggle-bars" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
