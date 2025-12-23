import React from 'react'
import { notFound } from 'next/navigation'
import IRDisplay from '../components/IRDisplay'
import IRFinancialReporting from '../components/IRFinancialReporting'
import GovernancePage from '../components/GovernancePage'
import IROthers from '../components/IROthers'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  switch (slug) {
    case 'initial-public-offering-ipo':
      return <IRDisplay />
    case 'financial-reporting':
      return <IRFinancialReporting />
    case 'governance':
      return <GovernancePage />
    case 'others':
      return <IROthers />
    default:
      return notFound()
  }
}
