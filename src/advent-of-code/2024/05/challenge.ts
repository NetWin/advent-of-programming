import { onChallenge } from '../../../utils';
import { challenge01 } from './challenge-1';
import { challenge02 } from './challenge-2';

onChallenge(2024, 5, async () => {
  await challenge01();
  await challenge02();
});
