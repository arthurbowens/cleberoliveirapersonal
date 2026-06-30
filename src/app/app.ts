import { Component } from '@angular/core';
import { IconComponent } from './icon.component';

interface Service {
  icon: string;
  title: string;
  description: string;
  benefit: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-root',
  imports: [IconComponent],
  templateUrl: './app.html',
})
export class App {
  readonly currentYear = new Date().getFullYear();
  readonly city = 'Itumbiara';
  readonly state = 'GO';
  readonly whatsappPhone = '5562999999999';
  readonly whatsappDefaultMessage =
    'Olá, Cleber! Vi seu site e quero transformar meu corpo. Pode me contar mais sobre a consultoria?';

  readonly services: Service[] = [
    {
      icon: 'flame',
      title: 'Emagrecimento',
      description: 'Perca gordura de forma saudável, sem dietas malucas ou efeito sanfona.',
      benefit: 'Resultados visíveis em semanas, não em meses.',
    },
    {
      icon: 'body',
      title: 'Definição',
      description: 'Revele seus músculos com estratégia nutricional e treino inteligente.',
      benefit: 'Corpo seco, definido e com energia o dia todo.',
    },
    {
      icon: 'dumbbell',
      title: 'Hipertrofia',
      description: 'Ganhe massa muscular com periodização científica e acompanhamento real.',
      benefit: 'Evolução constante, sem estagnação.',
    },
    {
      icon: 'clipboard',
      title: 'Avaliação Física',
      description: 'Diagnóstico completo do seu corpo para um plano 100% personalizado.',
      benefit: 'Saiba exatamente por onde começar.',
    },
  ];

  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Conversa no WhatsApp',
      description: 'Você me conta seu objetivo, rotina e histórico. Sem compromisso.',
    },
    {
      number: '02',
      title: 'Plano sob medida',
      description: 'Receba treino, orientações e acompanhamento feitos para o SEU corpo.',
    },
    {
      number: '03',
      title: 'Resultados que ficam',
      description: 'Acompanho sua evolução e ajusto tudo para você não parar no meio do caminho.',
    },
  ];

  readonly faqs: Faq[] = [
    {
      question: 'A consultoria funciona para quem nunca treinou?',
      answer:
        'Sim! Monto o plano do zero, respeitando seu nível atual. O importante é começar com orientação certa.',
    },
    {
      question: 'Atende online ou só presencial?',
      answer:
        'Os dois! Consultoria online para qualquer lugar do Brasil e atendimento presencial em Itumbiara, GO e região.',
    },
    {
      question: 'Por que escolher um personal faixa preta de Jiu-Jitsu?',
      answer:
        'Entendo a demanda de performance, resistência e força funcional — seja no tatame ou na vida.',
    },
    {
      question: 'Quanto tempo para ver resultados?',
      answer:
        'Com dedicação ao plano, a maioria dos alunos percebe mudanças nas primeiras 3 a 4 semanas.',
    },
  ];

  whatsappLink(message?: string): string {
    const text = encodeURIComponent(message ?? this.whatsappDefaultMessage);
    return `https://wa.me/${this.whatsappPhone}?text=${text}`;
  }

  serviceWhatsappLink(service: string): string {
    const message = `Olá, Cleber! Tenho interesse em ${service}. Pode me passar mais detalhes?`;
    return this.whatsappLink(message);
  }
}
