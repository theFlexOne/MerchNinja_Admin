import { useId as oldUseId } from 'react';

export default function useId(id?: string) {
  const backupId = oldUseId();
  return id ?? backupId;
}
