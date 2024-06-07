import { BedsoreLevel } from '@prisma/client';
import { preventionContent } from './guide-markdown-texts/prevention';
import { levelOneContent } from './guide-markdown-texts/level-one';
import { levelTwoContent } from './guide-markdown-texts/level-two';
import { levelThreeContent } from './guide-markdown-texts/level-three';
import { levelFourContent } from './guide-markdown-texts/level-four';
import { deepTissueDamageContent } from './guide-markdown-texts/deep-tissue-damage';
import { unclassifiedContent } from './guide-markdown-texts/unclassified';
import { deviceBedsoreContent } from './guide-markdown-texts/device-bedsore';
import { curedContent } from './guide-markdown-texts/cured';

export const seedBedsoreManagementGuides = [
  {
    level: BedsoreLevel.PREVENTION,
    title: '욕창 위험군에 따른 욕창 예방과 관리',
    description: preventionContent,
  },
  {
    level: BedsoreLevel.ONE,
    title: '1단계 관리 가이드',
    description: levelOneContent,
  },
  {
    level: BedsoreLevel.TWO,
    title: '2단계 관리 가이드',
    description: levelTwoContent,
  },
  {
    level: BedsoreLevel.THREE,
    title: '3단계 관리 가이드',
    description: levelThreeContent,
  },
  {
    level: BedsoreLevel.FOUR,
    title: '4단계 관리 가이드',
    description: levelFourContent,
  },
  {
    level: BedsoreLevel.DEEP_TISSUE_DAMAGE,
    title: '깊은 조직 손상 관리 가이드',
    description: deepTissueDamageContent,
  },
  {
    level: BedsoreLevel.UNCLASSIFIED,
    title: '미분류 관리 가이드',
    description: unclassifiedContent,
  },
  {
    level: BedsoreLevel.DEVICE_BEDSORE,
    title: '의료기기 관련 욕창 관리 가이드',
    description: deviceBedsoreContent,
  },
  {
    level: BedsoreLevel.CURED,
    title: '치료 후 관리 가이드',
    description: curedContent,
  },
];
