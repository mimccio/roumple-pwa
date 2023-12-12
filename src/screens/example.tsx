import { Loader2 } from 'lucide-react'
import { DocumentChartBarIcon } from '@heroicons/react/24/solid'

import { Button } from '@/common/ui/button'

export function Example() {
  return (
    <div className="p-4 flex flex-col gap-4 ">
      <h2 className="font-bold text-xl mb-4 text-foreground">Bonjour !</h2>
      <div className="flex gap-2 items-center">
        <Button className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" radius="none">
          hello - no
        </Button>
        <Button
          className="bg-gradient-to-br from-sky-300  via-purple-300  to-indigo-400 hover:bg-gradient-to-br hover:from-sky-600  hover:via-purple-600  hover:to-indigo-600 text-zinc-800"
          radius="sm"
        >
          hello - sm
        </Button>
        <Button>hello - md</Button>
        <Button radius="lg" color="gem">
          hello - lg
        </Button>
        <Button radius="full" color="info" size="sm">
          hello - full
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button color="primary" size="lg">
          hello
        </Button>
        <Button color="danger" className="text-zinc-950">
          hello
        </Button>
        <Button color="primary" className="bg-red-800 text-red-100" size="md">
          hello
        </Button>
        <Button color="primary" className="bg-indigo-800 text-indigo-100" size="md">
          hello
        </Button>
        <Button color="primary" className="bg-red-500 text-red-950" size="md">
          hello
        </Button>
        <Button color="primary" className="bg-red-500 text-gray-50" size="md">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center w-full bg-precious-dim">
        <Button variant="outline" size="lg">
          hello
        </Button>
        <Button color="month" variant="outline">
          hello
        </Button>
        <Button fullWidth variant="outline" size="sm">
          blou
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" color="gem" size="lg">
          hello
        </Button>
        <Button variant="outline" color="primary">
          hello
        </Button>
        <Button variant="outline" color="week" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center p-4 bg-menu">
        <Button variant="outline" color="week" size="lg">
          hello
        </Button>
        <Button variant="outline">hello</Button>
        <Button variant="outline" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="ghost" color="week" size="lg">
          hello
        </Button>
        <Button variant="ghost" color="precious">
          hello
        </Button>
        <Button variant="ghost" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="ghost" color="month" size="lg">
          hello
        </Button>
        <Button variant="ghost" color="gem">
          hello
        </Button>
        <Button variant="ghost" color="info" size="lg">
          hello yo
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="link" size="lg">
          hello
        </Button>
        <Button variant="link">hello</Button>
        <Button variant="link" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="link" color="gem" responsive startIcon={DocumentChartBarIcon} isLoading size="lg">
          hello
        </Button>
        <Button variant="link" color="warning">
          hello
        </Button>
        <Button variant="link" color="primary" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="icon" isLoading responsive>
          <DocumentChartBarIcon />
        </Button>

        <Button color="primary" size="icon">
          <DocumentChartBarIcon />
        </Button>

        <Button size="icon" responsive variant="outline" isLoading color="success">
          <DocumentChartBarIcon />
        </Button>

        <Button color="primary" responsive size="icon" variant="outline">
          <DocumentChartBarIcon />
        </Button>

        <Button color="primary" startIcon={DocumentChartBarIcon} responsive size="icon" variant="outline"></Button>
        <Button color="warning" responsive size="icon" variant="ghost">
          <DocumentChartBarIcon />
        </Button>
        <Button color="primary" responsive size="icon" variant="ghost">
          <DocumentChartBarIcon />
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button responsive startIcon={DocumentChartBarIcon} isLoading spinnerPosition="end" color="primary" size="lg">
          hello
        </Button>
        <Button responsive startIcon={DocumentChartBarIcon} isLoading color="primary">
          hello
        </Button>
        <Button responsive startIcon={Loader2} color="primary" size="sm">
          hello
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button responsive variant="outline" endIcon={Loader2} color="primary" size="lg">
          hello
        </Button>
        <Button responsive variant="outline" endIcon={Loader2} color="primary">
          hello
        </Button>
        <Button
          responsive
          variant="outline"
          className="w-full"
          endIcon={DocumentChartBarIcon}
          color="primary"
          size="sm"
        >
          hello
        </Button>
      </div>
    </div>
  )
}
