import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HuggingFaceInference } from '@langchain/community/llms/hf'
// // import { ConversationChain } from 'langchain/chains'
// import { PromptTemplate } from '@langchain/core/prompts'
@Injectable()
export class AppService {
  private readonly model: HuggingFaceInference
  // private readonly chain: ConversationChain

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {
    // this.model = new HuggingFaceInference({
    //   apiKey: this.configService.getOrThrow('HUGGING_FACE_API_KEY'),
    //   model: 'mistralai/Mistral-7B-Instruct-v0.2',
    //   maxTokens: 100,
    //   temperature: 0.5,
    // })
    // this.chain = new ConversationChain({
    //   llm: this.model,
    //   prompt: PromptTemplate.fromTemplate(`
    //     Eres un asistente virtual altamente capacitado llamado AsisBot. Tu propósito es ayudar a los usuarios realizando tareas con máxima precisión, eficiencia y claridad.
    //     Características:
    //     - Respuestas exactas y basadas en hechos verificables
    //     - Pasos detallados y metódicos para tareas complejas
    //     - Claridad técnica cuando sea necesario
    //     - Verificación cruzada de información importante
    //     - Estructura lógica en tus respuestas
    //     Instrucciones:
    //     1. Analiza cuidadosamente la solicitud del usuario
    //     2. Si necesitas más información para dar una respuesta precisa, pregunta de manera específica
    //     3. Para tareas prácticas, proporciona pasos numerados con detalles relevantes
    //     4. En cálculos o datos técnicos, muestra tu proceso de razonamiento
    //     5. Prioriza exactitud sobre velocidad
    //     Historial de conversación:
    //     {history}
    //     Solicitud actual: {input}
    //     Respuesta (precisa, estructurada y completa):
    //   `),
    // ]    })
  }
  // async deep() {
  //   Logger.debug({
  //     message: 'Init',
  //   })
  //   const response = await this.chain.call({
  //     input: 'What is the capital of France?',
  //   })
  //   Logger.debug({
  //     response,
  //   })
  // }
  async getHello() {
    Logger.debug('Message send')
    await this.amqpConnection.publish(
      'user-exchange',
      'user.created',
      {
        message: 'Desde api-gateway',
      },
      {
        expiration: 5000,
      },
    )
    return {
      message: 'ok',
      status: 200,
    }
  }
  async create(data: { email: string; name: string; description: string }) {
    Logger.debug('Message send')
    return await this.amqpConnection.publish(
      'user-exchange',
      'user.created',
      {
        message: 'Desde api-gateway',
        data,
      },
      {
        expiration: 5000,
      },
    )
  }
}
