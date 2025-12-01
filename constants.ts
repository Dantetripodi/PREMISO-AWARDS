import { Nominee, Category } from './types';

export const APP_STORAGE_KEY = 'superlativos-app-data';
export const DEFAULT_NOMINEES: Nominee[] = [
  { id: '1', name: 'Ana Garcia', avatar: '👩' },
  { id: '2', name: 'Carlos Ruiz', avatar: '🧑' },
  { id: '3', name: 'Sofia Lopez', avatar: '👱‍♀️' },
  { id: '4', name: 'Miguel Angel', avatar: '🧒' },
  { id: '5', name: 'Lucia Diaz', avatar: '👧' },
  { id: '6', name: 'Pedro Martinez', avatar: '👨' },
  { id: '7', name: 'Maria Fernandez', avatar: '👩‍🦱' },
  { id: '8', name: 'Juan Perez', avatar: '🧔' },
];

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat_1',
    title: 'El más Gracioso',
    description: '¿Quién siempre hace reír a la clase?',
    emoji: '😂',
    nominees: DEFAULT_NOMINEES
  },
  {
    id: 'cat_2',
    title: 'Futuro Presidente',
    description: '¿Quién es el más organizado y líder?',
    emoji: '👔',
    nominees: DEFAULT_NOMINEES
  },
  {
    id: 'cat_3',
    title: 'Más Estudioso',
    description: '¿Quién siempre saca las mejores notas?',
    emoji: '📚',
    nominees: DEFAULT_NOMINEES
  },
  {
    id: 'cat_4',
    title: 'Más Deportista',
    description: '¿Quién es el mejor en deportes?',
    emoji: '⚽',
    nominees: DEFAULT_NOMINEES
  },
  {
    id: 'cat_5',
    title: 'Más Artístico',
    description: '¿Quién tiene más talento creativo?',
    emoji: '🎨',
    nominees: DEFAULT_NOMINEES
  }
];
