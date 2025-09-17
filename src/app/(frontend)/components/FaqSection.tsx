'use client'

import React, { useState } from 'react'
import FadeIn from '@/app/animation/fade-in'

type FaqItem = {
  question?: string | null
  answer?: string | null
}

export function FaqSection({ title, items = [] }: { title?: string | null; items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section" style={{ padding: '64px 24px' }}>
      <FadeIn from="bottom" duration={0.4}>
        {title && (
          <h2
            style={{
              margin: 0,
              fontSize: 46,
              lineHeight: 1.1,
              letterSpacing: '-0.06em',
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            {title}
          </h2>
        )}
      </FadeIn>

      <div
        className="faq-list"
        style={{ maxWidth: 900, margin: '24px auto 0', display: 'grid', gap: 12 }}
      >
        {items.map((it, idx) => {
          const isOpen = openIndex === idx
          return (
            <FadeIn key={`faq-${idx}`} from="bottom" duration={0.3} delay={0.1 + idx * 0.05}>
              <div
                className={`faq-item${isOpen ? ' is-open' : ''}`}
                style={{
                  borderRadius: 12,
                  background: '#f2f2f2',
                  color: '#0b0b0b',
                  padding: 16,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  className="faq-question"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    fontSize: 20,
                    background: 'transparent',
                    border: 0,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 400,
                  }}
                >
                  <span>{it.question}</span>
                  <span aria-hidden>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="faq-answer"
                    style={{ marginTop: 10, opacity: 0.9, fontWeight: 400 }}
                  >
                    {it.answer}
                  </div>
                )}
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
