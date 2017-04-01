import { mergeState } from '@boluome/common-lib'

const initialState = {
  title: '{{ service }}'
}

const app = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export default app;
