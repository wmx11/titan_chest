import { PrismaClient, Project } from '@prisma/client';
import constructDynamicQuery from '../services/constructDynamicQuery';
import { DynamicQueryType } from '../types/ComputedFields';
import { Payload } from '../types/Stats';

const prisma = new PrismaClient();

export const getAllProjects = async (): Promise<Project[]> => {
  const projects: Project[] = await prisma.project.findMany();

  return projects;
};

export const getProjectById = async (payload: Payload): Promise<Project | null> => {
  const statsQuery: DynamicQueryType | Record<string, never> = constructDynamicQuery(payload);

  if (!statsQuery) {
    return null;
  }

  const project: Project | null = await prisma.project.findFirst({
    ...(statsQuery.query as object),
  });

  return project;
};

export const addProject = async (project: Project): Promise<Project | null> => {
  const entry: Project | null = await prisma.project.create({
    data: { ...project },
  });

  return entry;
};

export const updateProject = async (id: number, project: Project): Promise<Project | null> => {
  const entry: Project | null = await prisma.project.update({
    where: {
      id,
    },
    data: {
      ...project,
    },
  });

  return entry;
};

export const deleteProject = async (id: number): Promise<Project | null> => {
  const entry: Project | null = await prisma.project.delete({
    where: {
      id,
    },
  });

  return entry;
};
