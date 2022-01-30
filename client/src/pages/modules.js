import React from 'react';
import { Layout, ModuleDetail, QueryResult } from '../components'
import { gql, useQuery } from '@apollo/client'

export const GET_MODULE_AND_PARENT_TRACK = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`

const Module = ({ trackId, moduleId }) => {
  const {loading, error, data} = useQuery(GET_MODULE_AND_PARENT_TRACK, { variables: { trackId, moduleId }})
  return (
    <Layout fullWidth={true}>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail module={data?.module} track={data?.track}/>
        {/*<p>
          {JSON.stringify(data)}
        </p>*/}
      </QueryResult>
    </Layout>
  );
};

export default Module;
