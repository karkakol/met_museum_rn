import {useCallback, useEffect, useState} from 'react';

import type MuseumsResponse from '../model/MuseumsResponse';
import type {Action} from '../model/Action';

export default function useAllIds(search: string): Action<number[]> {
  const [inProgress, setInProgress] = useState(true);
  const [museumResponse, setMuseumResponse] = useState<MuseumsResponse>();
  const fetchMuseumsIds = useCallback(() => {
    const baseLink =
      'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    const searchLink = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search.trim()}`;

    setInProgress(true);
    fetch(search.trim().length === 0 ? baseLink : searchLink)
      .then(async res => await res.json())
      .then(resp => {
        setMuseumResponse(resp);
      })
      .catch(console.log)
      .finally(() => {
        setInProgress(false);
      });
  }, [search]);

  useEffect(fetchMuseumsIds, [fetchMuseumsIds]);

  return {
    inProgress,
    data: museumResponse?.objectIDs ?? [],
  };
}
