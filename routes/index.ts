import express, { Application, Request, Response } from 'express';

module.exports = (app: Application) => {
  require('./StatsRoutes')(app);
};