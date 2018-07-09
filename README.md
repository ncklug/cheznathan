This is a website to show the foods I know how to cook.


To see the end product, navigate your browser to `https://cheznathan.nckl.ug`.

# Tech
While this site is to show the foods I know how to cook, its real purpose is to show what I think are the best tools for building a "free" low-traffic dynamic site with a custom domain

## Hosting
Reputable, free hosting options for dynamic sites are pretty limited. I looked into:
- `now`, by Zeit, hosted by `now`: These are the folks who make `next`, and they have a strong track record. However, they require you to have a premium plan to use a custom domain (even if you have an external domain, they keep you from CNAMEing to their deployed endpoints)
-- `now` also allows you to deploy to AWS, which was a solid contender of an option, because then I wouldn't worry about the domain restrictions. I had some concerns that their AWS integration hadn't been updated in 11 months
- Heroku: Also a well-established name, and often used for hackathons and the like. The major drawback with Heroku is the sleeping of your containers after ~30 minutes of inactivity (which you can't get around with a ping service, because you also have a free hours quota), which means that with very inactive and non-bursty usage, every pageload feels really slow
- Hyper.sh: Seems to be getting good press lately, but costs at least $3/month to host. Also, hosted on a Chinese company hosting service and I have my suspicions about the Chinese government in terms of tech
- Firebase: A very solid option which I may try in the future.
- AWS, via Up, by Apex: All the major cloud providers offer a generous free tier, and Up is a product by a 1-person company that promises much the same great DX as `now`. I like supporting ambitious 1-person companies, and since it's a simple layer on top of AWS, which does most of the heavy-lifting, I'm not super concerned about the reliability.

## Frontend Framework
The main criteria here were:
1. React-based: Vue is getting a lot of hype now, but I still think React isn't going anywhere fast and has great DX
1. Dynamic: I'd like to make changes to a backend db and have the app auto-update with the content
1. Server-rendered: For speed and SEO (although the latter shouldn't be necessary)
The main contenders:
- gatsby.js: While they may support streaming builds in the future with their cloud service, which would offer a dynamic-like feel, that future isn't here yet.
- next.js: The new hotness in server rendered dynamic apps that I've wanted to try for a while.
