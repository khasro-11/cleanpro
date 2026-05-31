import PhoneIcon from './PhoneIcon'

export default function MobileCallBar() {
  return (
    <div className="callbar">
      <a href="tel:+4915510057038" className="c1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
        <PhoneIcon size={17} />Anrufen
      </a>
      <a href="#kostenvoranschlag" className="c2">Angebot anfordern</a>
    </div>
  )
}
