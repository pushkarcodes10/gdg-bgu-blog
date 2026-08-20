import React from 'react'
import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import { getAllMembers } from '@/lib/members-db'
import { TeamAvatar } from '@/components/team-avatar'

export const dynamic = 'force-dynamic'

export default async function OurTeamPage() {
  const teamMembers = await getAllMembers()

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteNavbar />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our Team
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
              Meet the passionate student developers and leaders building the GDG On Campus community at Birla Global University.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {teamMembers.map((member) => {
              const isOrganizer = member.systemRole === 'admin' || member.role.toLowerCase().includes('organizer')

              return (
                <div
                  key={member.id || member.email}
                  className="group flex flex-col items-center text-center transition-all duration-300"
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border/80 bg-muted/50 p-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-md sm:h-36 sm:w-36">
                    <TeamAvatar src={member.avatar} name={member.name} />
                  </div>

                  <h3 className="mt-4 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                    {isOrganizer ? (
                      <span className="text-primary underline decoration-primary/40 underline-offset-4 font-semibold">
                        {member.role}
                      </span>
                    ) : (
                      member.role
                    )}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
