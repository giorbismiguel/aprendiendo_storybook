
import React from 'react'
import { GitHubUser } from "./GitHubUser";
import { rest } from 'msw'
import { worker } from '../../src/mocks/browser'

export default {
  title: "GitHub User",
  component: GitHubUser,
};

export const DefaultState = () => <GitHubUser username="giorbismiguel" />;

// Create a new loading state story.
export const LoadingState = () => <GitHubUser username="hamilton.elly" />

// Use Storybook decorators and MSW runtime handlers
// to handle the same HTTP call differently for this particular story.
LoadingState.decorators = [
  (Story) => {
    worker.use(
      rest.get('https://api.github.com/users/:username', (req, res, ctx) => {
        // Mock an infinite loading state.
        return res(ctx.delay('infinite'))
      })
    )
    return <Story />
  },
]

export const ErrorState = () => <GitHubUser username="hamilton.elly" />

ErrorState.decorators = [
  (Story) => {
    worker.use(
      rest.get('https://api.github.com/users/:username', (req, res, ctx) => {
        // Respond with a 500 response status code.
        return res(ctx.status(500))
      })
    )
    return <Story />
  },
]