export interface LicenseProps {
  owner: string
  expedition: string
  identifier: number
}

export default function LicenseComponent({owner, expedition, identifier}: LicenseProps) {
  return (
    <>
      <div>Owner: {owner}</div>
      <div>Expedition date: {expedition}</div>
      <div>ID: {identifier}</div>
    </>
  )
}
