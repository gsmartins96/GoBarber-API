import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

// Assim como no load de Models:
// Sempre que tivermos um novo JOB, iremos coloca-lo nesse vetor:
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // Como feito no load da models, porém usando forEach
    // Dessa forma podemos acessar os metodos e as propriedades da classe fácil.
    jobs.forEach(({ key, handle }) => {
      // Iremos adicionar os jobs na Queue
      this.queues[key] = {
        // Pega a fila que possui conexão com o banco não relacional Redis
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        // E o metodo handle que irá processar o job
        handle,
      };
    });
  }

  // Adiciona um novo Job na fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
