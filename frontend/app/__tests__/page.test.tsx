import { render } from '@testing-library/react'
import Page from '../page'
import { describe, it, expect } from 'vitest'

describe('Page', () => {
    it('renders correctly', () => {
        try {
            render(<Page />)
            expect(true).toBe(true)
        } catch (e) {
            throw e
        }
    })
})
