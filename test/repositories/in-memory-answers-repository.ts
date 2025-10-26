import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswerAttachmentsRepository } from './in-memory-answer-attachments-repository'
import { Domain } from 'domain'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = this.items.find(item => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex(item => item.id === answer.id)

    if (answerIndex >= 0) {
      this.items[answerIndex] = answer
    }

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex(item => item.id === answer.id)

    if (answerIndex >= 0) {
      this.items.splice(answerIndex, 1)
    }

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
