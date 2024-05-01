import { describe, it, vi, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomePage from '../HomePage.vue'
import { createTestingPinia } from '@pinia/testing'

describe('HomePage', () => {
  it('renders properly', () => {
    const wrapper = mount(HomePage, {
      props: {
        msg: 'Home Page',
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
