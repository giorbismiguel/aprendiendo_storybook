
import React from 'react'
import { GitHubUser } from "./GitHubUser";

export default {
  title: "GitHub User",
  component: GitHubUser,
};

export const DefaultState = () => <GitHubUser username="giorbismiguel" />;
