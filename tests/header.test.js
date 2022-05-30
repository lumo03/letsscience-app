/* eslint-env jest */
import Header from '../src/components/header'
import { render } from 'enzyme'

describe('Initial Test of the Header', () => {
  test('Header renders 3 nav items', () => {
    const context = render(<Header />)
    expect(context.find('h1').text()).toBe('React App')
    expect(context.find('a').length).toBe(3)
  })
})
