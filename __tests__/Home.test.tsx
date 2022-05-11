import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from "src/pages"

it('Should render title text', () => {
  render(<Home />)
  expect(screen.getByText('Next.js + GraphQL')).toBeInTheDocument()
})