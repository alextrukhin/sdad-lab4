import { describe, it, vi, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PositionPage from '../PositionPage.vue'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    fullPath: '',
    hash: '',
    matched: [],
    meta: {},
    name: undefined,
    params: {
      id: '1'
    },
    path: '/test',
    query: {},
    redirectedFrom: undefined
  }))
}))

describe('PositionPage', () => {
  it('renders properly', () => {
    const wrapper = mount(PositionPage, {
      props: {
        msg: 'Position Page',
        global: {
          plugins: [
            createTestingPinia({
              stubActions: false,
              initialState: {
                db: {}
              },
              createSpy: vi.fn
            })
          ]
        }
      }
    })
    expect(wrapper.text()).toContain('Software Engineer')
    expect(wrapper.text()).toContain('Remote')
  })
})
