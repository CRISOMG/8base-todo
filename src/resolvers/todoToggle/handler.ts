/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    todoToggle:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local todoToggle -p src/resolvers/todoToggle/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local todoToggle -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock todoToggle -m [MOCK_FILE_NAME]
 */

import { FunctionContext, FunctionEvent, FunctionResult } from '8base-cli-types';
import { gql } from 'graphql-tag';

type ResolverResult = FunctionResult<{
  id: string,
  text: string,
  completed: boolean
}>;

const UPDATE_TODO = gql`
  mutation todoUpdate($data: TodoUpdateInput!) {
    todoUpdate(data: $data) {
      id
      text
      completed
    }
  }
`;

type Todo = {
  id: string,
  completed: boolean
}
type TodoUpdatedResponse = {
  todoUpdate: {
    id: string,
    text: string,
    completed: boolean
  }
}

export default async (event: FunctionEvent<Todo>, ctx: FunctionContext): ResolverResult => {
  let todoUpdatedResponse: TodoUpdatedResponse;
  const todo: Todo = event.data;
  try {
    todoUpdatedResponse = await ctx.api.gqlRequest(UPDATE_TODO, {
      data: {
        id: todo.id,
        completed: !todo.completed,
      }
    });

  } catch (error) {
    return { errors: error }
  }
  return {
    data: { ...todoUpdatedResponse.todoUpdate }
  };
};
