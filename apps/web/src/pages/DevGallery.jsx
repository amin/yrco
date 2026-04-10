import { useState } from 'react'
import {
  HomeIcon, SearchIcon, HeartIcon, CloseIcon, QrIcon,
  ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon, ArrowUpIcon,
} from '@/shared/icons'
import { Button, ToggleButton, HeartButton, InputText, ControllerTwoInput } from '@/shared/ui'

const icons = [
  { name: 'HomeIcon',       Component: HomeIcon },
  { name: 'SearchIcon',     Component: SearchIcon },
  { name: 'HeartIcon',      Component: HeartIcon },
  { name: 'CloseIcon',      Component: CloseIcon },
  { name: 'QrIcon',         Component: QrIcon },
  { name: 'ArrowLeftIcon',  Component: ArrowLeftIcon },
  { name: 'ArrowRightIcon', Component: ArrowRightIcon },
  { name: 'ArrowDownIcon',  Component: ArrowDownIcon },
  { name: 'ArrowUpIcon',    Component: ArrowUpIcon },
]

export const DevGallery = () => {
  const [orLeft, setOrLeft] = useState(true)
  const [orRight, setOrRight] = useState(false)
  const [andLeft, setAndLeft] = useState(false)
  const [andRight, setAndRight] = useState(false)

  return (
  <div className="p-8 flex flex-col gap-10">
    <h1 className="text-xl font-semibold">Dev Gallery</h1>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Icons</h2>
      <table className="border-collapse text-sm">
        <thead>
          <tr className="text-left">
            <th className="pr-8 pb-4 font-semibold">Name</th>
            <th className="pr-8 pb-4 font-semibold">Default</th>
            <th className="pr-8 pb-4 font-semibold">Active</th>
            <th className="pr-8 pb-4 font-semibold">Colored</th>
          </tr>
        </thead>
        <tbody>
          {icons.map(({ name, Component }) => (
            <tr key={name} className="border-t border-gray-100">
              <td className="pr-8 py-3 text-gray-500">{name}</td>
              <td className="pr-8 py-3"><Component /></td>
              <td className="pr-8 py-3"><Component active /></td>
              <td className="pr-8 py-3 flex gap-3">
                <Component className="text-yrgo-red" />
                <Component active className="text-yrgo-blue" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Button — Primary</h2>
      <div className="flex gap-4 items-center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Button — Secondary</h2>
      <div className="flex gap-4 items-center">
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Toggle Button</h2>
      <div className="flex gap-4 items-center">
        <ToggleButton>Default</ToggleButton>
        <ToggleButton picked>Picked</ToggleButton>
        <ToggleButton disabled>Not Picked</ToggleButton>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Heart Button</h2>
      <div className="flex gap-4 items-center">
        <HeartButton />
        <HeartButton active />
        <HeartButton disabled />
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Input Text</h2>
      <div className="flex flex-col gap-3">
        <InputText placeholder="With search icon" className="w-64" />
        <InputText placeholder="Without search icon" showSearch={false} className="w-64" />
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Controller — Two Input (OR)</h2>
      <ControllerTwoInput
        label="Instruction text field"
        leftLabel="Option A"
        rightLabel="Option B"
        leftPicked={orLeft}
        rightPicked={orRight}
        onLeftClick={() => { setOrLeft(true); setOrRight(false) }}
        onRightClick={() => { setOrLeft(false); setOrRight(true) }}
      />
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Controller — Two Input (AND/OR)</h2>
      <ControllerTwoInput
        label="Instruction text field"
        leftLabel="Option A"
        rightLabel="Option B"
        leftPicked={andLeft}
        rightPicked={andRight}
        onLeftClick={() => setAndLeft(v => !v)}
        onRightClick={() => setAndRight(v => !v)}
      />
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-500">Loader</h2>
      <video
        src="https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/yrco-loading.mp4"
        className="size-[60px]"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  </div>
  )
}
