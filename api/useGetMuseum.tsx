import {useCallback, useEffect, useState} from 'react';

import type Museum from '../model/Museum';
import type {Action} from '../model/Action';

export default function useGetMuseum(id: number): Action<Museum> {
  const [inProgress, setInProgress] = useState(true);
  const [museum, setMuseum] = useState<Museum>();
  const fetchDetailedMuseum = useCallback(() => {
    setInProgress(true);
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    )
      .then(async res => await res.json())
      .then(resp => {
        setMuseum(resp);
      })
      .catch(console.log)
      .finally(() => {
        setInProgress(false);
      });
  }, [id, setMuseum, setInProgress]);

  useEffect(fetchDetailedMuseum, [fetchDetailedMuseum]);

  return {
    inProgress,
    data: museum ?? null,
  };
}
