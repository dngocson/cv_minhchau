import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@/lib/i18n'
import { Hero } from '@/components/sections/hero'
import { Experience } from '@/components/sections/experience'
import { Skills } from '@/components/sections/skills'

describe('portfolio sections render with CV content', () => {
  it('renders the hero with name, role and a stat label', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Nguyen Minh Chau' })).toBeTruthy()
    expect(screen.getByText('Chemical Sales Engineer')).toBeTruthy()
    expect(screen.getByText('B2B clients managed')).toBeTruthy()
  })

  it('renders experience entries driven by dynamic i18n keys', () => {
    render(<Experience />)
    expect(screen.getByText('Tuong Ngoc International Investment Co., Ltd.')).toBeTruthy()
    // a bullet pulled via tList(returnObjects)
    expect(
      screen.getByText(/Managed and developed relationships with over 50 business clients/),
    ).toBeTruthy()
  })

  it('renders skill groups and glossary labels', () => {
    render(<Skills />)
    expect(screen.getByText('Sales & Business')).toBeTruthy()
    expect(screen.getByText('UV-Vis Spectroscopy')).toBeTruthy()
  })
})
