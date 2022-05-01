import { PrismaClient } from '@prisma/client';
import { Project } from '../types/Project';

const prisma = new PrismaClient();

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany();

  return projects;
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findFirst({
    where: {
      id,
    },
  });

  return project;
};

export const addProject = async (project: Project) => {
  const entry = await prisma.project.create({
    data: { ...project },
  });

  return entry;
};

export const updateProject = async (id: number, project: Project) => {
  const entry = await prisma.project.update({
    where: {
      id,
    },
    data: {
      ...project,
    },
  });

  return entry;
};

export const deleteProject = async (id: number) => {
  const entry = await prisma.project.delete({
    where: {
      id,
    },
  });

  return entry;
};
