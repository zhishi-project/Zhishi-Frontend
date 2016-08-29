export default [
  {
    'id': 145,
    'title': 'How do I access a pg db on the host computer from a container?',
    'content': '<p>I have a dockerized app that I want to test with the pg db&nbsp;on the host machine. I run the image using the --<code>net=host</code>&nbsp;option to allow it access to the host network\'s connection but I get this error:</p>\n<pre class="language-markup"><code>➜  docker docker run --rm --net=host goapp:v1\n2016/07/08 09:46:53 Starting application ...\n2016/07/08 09:46:53 localhost:5432\n2016/07/08 09:46:53 dial tcp 127.0.0.1:5432: getsockopt: connection refused</code></pre>\n<p>I did some googling and the suggestions are that pg is possibly refusing connections from non localhost requests. I modified my <code>postgresql.conf</code>&nbsp;and <code>pg_hba.conf</code>&nbsp;but the error persists.</p>\n<p>Here\'s the code snippet:</p>\n<pre class="language-c"><code>package main\n\nimport (\n    "fmt"\n    "log"\n    "net"\n\n    "github.com/jmoiron/sqlx"\n\t_ "github.com/lib/pq" // Blank import needed to import postgres driver \'pq\'\n)\n\nvar (\n  config Config\n  db *sqlx.DB\n  err error\n)\n\ntype Config struct{\n  DataDir string `json:"datadir"`\n\n    // Database settings.\n    Host     string `json:"host"`\n    Port     string `json:"port"`\n    Username string `json:"username"`\n    Password string `json:"password"`\n    Database string `json:"database"`\n}\n\nfunc main(){\n  log.Println("Starting application ...")\n\n  config = Config{\n    Host     : "localhost",\n    Port     : "5432",\n    Username : "postgres",\n    Database : "postgres",\n  }\n    // Connect to database.\n    hostPort := net.JoinHostPort(config.Host, config.Port)\n    log.Println(hostPort)\n    dsn := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable",\n        config.Username, config.Password, hostPort, config.Database)\n\n    db, err = sqlx.Open("postgres", dsn)\n    if err != nil {\n        log.Fatal(err)\n    }\n\n    if err := db.Ping(); err != nil {\n        log.Fatal(err)\n    }\n    log.Println("Application started successfully!")\n}\n</code></pre>\n<p>Any idea how I could go about this?</p>',
    'votes_count': 0,
    'answers_count': 1,
    'comments_count': 1,
    'views': 20,
    'created_at': '2016-07-11T10:35:23.875Z',
    'updated_at': '2016-07-12T00:52:53.753Z',
    'user': {
        'id': 49,
        'name': 'Osmond Oranagwa',
        'points': 223,
        'image': 'https://lh3.googleusercontent.com/-0f_Ad-u24v8/AAAAAAAAAAI/AAAAAAAAABI/zaV-WPY2wFM/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/49.json'
      },
    'tags': [
        {
          'id': 90,
          'name': 'databases',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/145'
  },
  {
    'id': 144,
    'title': 'Contributing to Open Source Projects',
    'content': '<p>What do I benefit from contributing to open source projects as an Andela Fellow ?<br />How does this contribution make a difference in my career ?</p>',
    'votes_count': 2,
    'answers_count': 3,
    'comments_count': 1,
    'views': 67,
    'created_at': '2016-07-11T09:12:16.636Z',
    'updated_at': '2016-07-16T23:48:57.865Z',
    'user': {
        'id': 1,
        'name': 'Blessing Ebowe',
        'points': 128,
        'image': 'https://lh3.googleusercontent.com/-zOGYgaSXznw/AAAAAAAAAAI/AAAAAAAAADQ/8WAg6pb1Kx8/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/1.json'
      },
    'tags': [
        {
          'id': 3,
          'name': 'success',
          'representative_id': null
        },
        {
          'id': 28,
          'name': 'open-source',
          'representative_id': null
        },
        {
          'id': 8,
          'name': 'available-fellows',
          'representative_id': 11
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/144',
    'user_vote': 1,
    'answers': [
        {
          'question_id': 144,
          'comments_count': 0,
          'id': 200,
          'content': '<p>My favorite topic!</p>\n<p>There\'s already a ton of literature that speaks about the general benefits of open source work to your network, portfolio, tech and soft skills, so I won\'t cover that. I\'ll just speak to&nbsp;the benefits for a Fellow working on an open source team in Andela:</p>\n<ul>\n<li><strong>Channel the skills and knowledge of Andela to a cause/project/idea that you think is meaningful.</strong> Andela is a tech powerhouse, and with open source work you can create a team to focus the horsepower of you and your coworkers on something that <em>you</em>&nbsp;care about. Additionally, every month we\'ll have a demo day where you can show off the great stuff you\'ve made.</li>\n<li><strong>Work with some of the best developers in the world to prepare you for client engagements and beyond.</strong> The developers on open source projects are two things: talented and eager to onboard new team members.&nbsp;There\'s no better group of people to learn from, and your public work on open source projects will be taken into account when staffing new engagements. As will the leadership/teamwork skills you show through your work.</li>\n<li><strong style="line-height: 19.6px;">Advance toward promotion faster when you\'re not on an engagement.&nbsp;</strong>Working on open source teams gets you billable hours and opportunities to demonstrate mastery of the other skills that are necessary for promotion. Plus, you\'re encouraged to continue applying to engagements and can switch onto one as soon as you\'re placed.</li>\n<li><strong>Become a tech leader by giving back.</strong>&nbsp;Andela would not be possible without the open source work of programmers in the past. Pay it forward for the next generation and you\'ll earn their&nbsp;gratitude and respect.</li>\n</ul>',
          'votes_count': 5,
          'accepted': true,
          'created_at': '2016-07-11T14:31:24.831Z',
          'updated_at': '2016-07-11T14:36:44.852Z',
          'user_vote': 1,
          'user': {
            'id': 99,
            'name': 'Roberto Goizueta',
            'points': 55,
            'image': 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
            'url': 'http://zhishi-engine.herokuapp.com/users/99.json'
          },
          'comments': []
        },
        {
          'question_id': 144,
          'comments_count': 0,
          'id': 197,
          'content': '<p>Here are two links that talk about the benefits of contributing open source.<br /><a href="http://www.makeuseof.com/tag/people-contribute-open-source-projects/" target="_blank">Why people contribute to open source</a></p>\n<p><a href="http://www.makeuseof.com/tag/contribute-opensource-projects/" target="_blank">Why you should contribute to open source</a></p>',
          'votes_count': 2,
          'accepted': false,
          'created_at': '2016-07-11T09:15:27.157Z',
          'updated_at': '2016-07-11T09:15:27.157Z',
          'user_vote': 1,
          'user': {
            'id': 1,
            'name': 'Blessing Ebowe',
            'points': 128,
            'image': 'https://lh3.googleusercontent.com/-zOGYgaSXznw/AAAAAAAAAAI/AAAAAAAAADQ/8WAg6pb1Kx8/photo.jpg',
            'url': 'http://zhishi-engine.herokuapp.com/users/1.json'
          },
          'comments': []
        },
        {
          'question_id': 144,
          'comments_count': 0,
          'id': 201,
          'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.1.0.1:$0.1.0.1">\n<p>@Roberto has already given <a href="144#answer-200">a very excellent answer</a>. I might also just want to add one more thing. Contributing to open-source creates a great brand (and respect) for you as a software developer.</p>\n<p>Also, working with Andela clients, remember your work is always covered with NDA (Non-disclosure Agreement), meaning you can\'t really show what you did; however awesome it was. And there\'s a good reason for this. However, with open-source, your work can now speak for itself. And you will realize that you will not have to write lengthy cover letters, but a job application could be as short as sending your Github portfolio, perhaps with a note: "see what I did, I can do much more, working with you" :)</p>\n<p>I\'m really looking forward to seeing lots of Andela developers plunging into open-source. Andela might the only company I know that actually pays you to work on open-source. Please, please, don\'t let <a href="https://sites.google.com/a/andela.co/home/success/approved-initiatives/open-source-work-for-available-fellows">this opportunity pass</a>!</p>\n</div>',
          'votes_count': 1,
          'accepted': false,
          'created_at': '2016-07-12T14:24:35.976Z',
          'updated_at': '2016-07-12T14:26:47.489Z',
          'user_vote': null,
          'user': {
            'id': 67,
            'name': 'Anthony Nandaa',
            'points': 35,
            'image': 'https://lh3.googleusercontent.com/-Z0JHkGPpINA/AAAAAAAAAAI/AAAAAAAAAGg/-FhwT5bpzWQ/photo.jpg',
            'url': 'http://zhishi-engine.herokuapp.com/users/67.json'
          },
          'comments': []
        }
      ],
    'comments': [
        {
          'id': 367,
          'content': '@roberto can throw more light on the benefits as an Andela Fellow.',
          'votes_count': 0,
          'created_at': '2016-07-11T09:16:04.451Z',
          'updated_at': '2016-07-11T09:16:04.451Z',
          'comment_on_id': 144,
          'comment_on_type': 'Question',
          'user_vote': null,
          'user': {
            'id': 1,
            'name': 'Blessing Ebowe',
            'points': 128,
            'image': 'https://lh3.googleusercontent.com/-zOGYgaSXznw/AAAAAAAAAAI/AAAAAAAAADQ/8WAg6pb1Kx8/photo.jpg',
            'url': 'http://zhishi-engine.herokuapp.com/users/1.json'
          }
        }
      ]
  },
  {
    'id': 142,
    'title': 'jsx-coffeeScript',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p class="p1"><span class="s1">How one would write this in CoffeeScript.</span></p>\n<div class="prism-show-language">\n<div class="prism-show-language-label">Markup</div>\n</div>\n<div class="prism-show-language">\n<div class="prism-show-language-label">Markup</div>\n</div>\n<pre class="language-markup"><code>list.map(function(timeValue) {\n    return (\n        &lt;option key={timeValue} value={timeValue}&gt;{timeValue}&lt;/option&gt;\n    )</code></pre>\n<p class="p3">There does not seem to be much support out there on <strong>react jsx -&gt; coffeeScript</strong></p>\n<p class="p3">My attempt at conversion is:</p>\n<div class="prism-show-language">\n<div class="prism-show-language-label">Markup</div>\n</div>\n<pre class="language-markup"><code>list.map((timeValue) -&gt; {\n    option, value: {timeValue}, key: {timeValue}, {timeValue}\n})</code></pre>\n<p>This, however, throws an error by coffeeScript linting.</p>\n</div>\n</div>\n</div>',
    'votes_count': 2,
    'answers_count': 6,
    'comments_count': 0,
    'views': 155,
    'created_at': '2016-06-29T17:34:19.550Z',
    'updated_at': '2016-07-11T11:42:59.337Z',
    'user': {
        'id': 223,
        'name': 'Nate Martin',
        'points': 20,
        'image': 'https://lh4.googleusercontent.com/-GP1jLEGo0pA/AAAAAAAAAAI/AAAAAAAAACg/9ROsmGQdF78/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/223.json'
      },
    'tags': [
        {
          'id': 30,
          'name': 'react',
          'representative_id': null
        },
        {
          'id': 6,
          'name': 'javascript',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/142'
  },
  {
    'id': 141,
    'title': 'How do I get a new Andela T-shirt when my current one is no longer TIA',
    'content': '<p>Some of our Andela T-shirts are no longer presentable and they neither befit Andela nor the bearer. So how do fellows get their shirts replaced?</p>',
    'votes_count': 2,
    'answers_count': 2,
    'comments_count': 1,
    'views': 75,
    'created_at': '2016-06-28T13:45:23.760Z',
    'updated_at': '2016-07-11T11:32:20.248Z',
    'user': {
        'id': 40,
        'name': 'Surajudeen Akande',
        'points': 20,
        'image': 'https://lh6.googleusercontent.com/-op5Ri4E2kMk/AAAAAAAAAAI/AAAAAAAAAD4/M3qWn1VS0EA/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/40.json'
      },
    'tags': [
        {
          'id': 11,
          'name': 'fellows-lagos',
          'representative_id': null
        },
        {
          'id': 12,
          'name': 'lagos',
          'representative_id': 11
        },
        {
          'id': 4,
          'name': 'operations',
          'representative_id': null
        },
        {
          'id': 5,
          'name': 'societies',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/141'
  },
  {
    'id': 135,
    'title': 'Getting Started With Javascript Stack (React JS)',
    'content': '<p><span class="s1">I just joined my simulations team and I&rsquo;m looking to learn PostgreSQL, React and Express efficiently and relatively quickly. Does any of you have any advice or pointers that may help?</span></p>',
    'votes_count': 2,
    'answers_count': 2,
    'comments_count': 4,
    'views': 63,
    'created_at': '2016-06-22T21:26:51.890Z',
    'updated_at': '2016-07-06T00:10:44.531Z',
    'user': {
        'id': 90,
        'name': 'Seyi Adekoya',
        'points': 110,
        'image': 'https://lh3.googleusercontent.com/-TmaBMhYx8mU/AAAAAAAAAAI/AAAAAAAAABg/clWfb3kLxZc/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/90.json'
      },
    'tags': [
        {
          'id': 15,
          'name': 'training',
          'representative_id': null
        },
        {
          'id': 14,
          'name': 'simulations',
          'representative_id': 15
        },
        {
          'id': 30,
          'name': 'react',
          'representative_id': null
        },
        {
          'id': 6,
          'name': 'javascript',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/135'
  },
  {
    'id': 134,
    'title': 'How do I get certified in a stack different from what I trained on?',
    'content': '<p>There\'s been talk about getting certified internally on the stacks offered during training at Andela. How do I go about applying to be certified?</p>',
    'votes_count': 1,
    'answers_count': 2,
    'comments_count': 1,
    'views': 37,
    'created_at': '2016-06-22T09:49:12.008Z',
    'updated_at': '2016-07-05T23:58:15.436Z',
    'user': {
        'id': 44,
        'name': 'Tobi Oduah',
        'points': 15,
        'image': 'https://lh4.googleusercontent.com/-KEJxaFHAZlk/AAAAAAAAAAI/AAAAAAAAABI/5nSGr5O-2GI/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/44.json'
      },
    'tags': [
        {
          'id': 15,
          'name': 'training',
          'representative_id': null
        },
        {
          'id': 8,
          'name': 'available-fellows',
          'representative_id': 11
        },
        {
          'id': 3,
          'name': 'success',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/134'
  },
  {
    'id': 132,
    'title': 'Will Open Andela have non-fellow instructors?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>During the 11-week Open Andela period, will the training be done by fellows only or will outside trainers be part of it? If fellows are going to be part of the training, will it be considered an engagement?</p>\n</div>\n</div>',
    'votes_count': 2,
    'answers_count': 1,
    'comments_count': 1,
    'views': 27,
    'created_at': '2016-06-21T16:36:37.461Z',
    'updated_at': '2016-06-30T13:57:41.521Z',
    'user': {
        'id': 73,
        'name': 'Gertrude Nyenyeshi',
        'points': 20,
        'image': 'https://lh6.googleusercontent.com/-aeoNXShj0CM/AAAAAAAAAAI/AAAAAAAAAA0/xu3ZZPYBW_U/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/73.json'
      },
    'tags': [
        {
          'id': 57,
          'name': 'fellows',
          'representative_id': 18
        },
        {
          'id': 3,
          'name': 'success',
          'representative_id': null
        },
        {
          'id': 91,
          'name': 'recruitment',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/132'
  },
  {
    'id': 130,
    'title': 'How do I do away with explicitly calling object while using a decorator',
    'content': '<p>I am currently&nbsp;working with decorators in order to clean up my rails views. However, I observe that I any model object I decorate in a controller is not just a model object. Normal model methods will not be available to the decorated object except I first call .object on it before calling the method.</p>\n<p>Example:</p>\n<p>Models</p>\n<pre><code>class Review &lt; ActiveRecord::Base</code><br />  def foo<br />&nbsp;&nbsp;  "bar"<br />  end<br />end<br /><br />Controller<br />class ReviewsController<br />  def show<br />    @review = Review.first<br />    @decorared_review = Review.first.decorate<br />  end<br />end<br /><br />Views<br /><br />&lt;%= @review.foo %&gt;  #gives bar<br />&lt;%= @decorated_review.foo %&gt; #throws an exception<br />&lt;%= @decorated_review.object.foo %&gt; #gives bar<br /><br /><br /><br /></pre>\n<p>Must I always call object on a decorated object before it can assess its own native model methods.</p>\n<p>Or is there a configuration I am getting wrong</p>',
    'votes_count': 1,
    'answers_count': 1,
    'comments_count': 0,
    'views': 27,
    'created_at': '2016-06-21T12:19:36.976Z',
    'updated_at': '2016-07-10T18:57:08.326Z',
    'user': {
        'id': 84,
        'name': 'Mayowa Pitan',
        'points': 26,
        'image': 'https://lh5.googleusercontent.com/-709fFeD_FK4/AAAAAAAAAAI/AAAAAAAAACI/TJCfSBxmuZY/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/84.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/130'
  },
  {
    'id': 128,
    'title': 'What are the plans for Discrete Maths?',
    'content': '<p>&nbsp;</p>\n<p class="p1"><span class="s1">Discrete Maths class used to hold on Sunday, 3-5pm by Ifeanyi, this has not been held for a while now and I was wondering if there would still be any plans for it, especially since Ifeanyi has left Andela?</span></p>',
    'votes_count': 1,
    'answers_count': 1,
    'comments_count': 0,
    'views': 30,
    'created_at': '2016-06-20T09:42:42.023Z',
    'updated_at': '2016-07-07T20:42:45.511Z',
    'user': {
        'id': 3,
        'name': 'Oreoluwa A',
        'points': 273,
        'image': 'https://lh4.googleusercontent.com/-GXaO4vGuCwI/AAAAAAAAAAI/AAAAAAAAABY/eSjUIg-vG68/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/3.json'
      },
    'tags': [
        {
          'id': 15,
          'name': 'training',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/128'
  },
  {
    'id': 127,
    'title': 'What will be the impact of our Series B funding?',
    'content': '<p>It\'s been exciting all last week with the public announcement of Series B funding led by CZI. That this will further easen ops and facilitates our efforts in reaching more potential fellows across the continent is straightforward what will require more insight will be how it will affect management structure (if any).</p>\n<p>Will there be any change to the way we operate, the decisons we make as a company and other such management related process?</p>',
    'votes_count': 0,
    'answers_count': 1,
    'comments_count': 0,
    'views': 58,
    'created_at': '2016-06-20T08:28:15.537Z',
    'updated_at': '2016-06-28T14:54:25.400Z',
    'user': {
        'id': 49,
        'name': 'Osmond Oranagwa',
        'points': 223,
        'image': 'https://lh3.googleusercontent.com/-0f_Ad-u24v8/AAAAAAAAAAI/AAAAAAAAABI/zaV-WPY2wFM/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/49.json'
      },
    'tags': [
        {
          'id': 4,
          'name': 'operations',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/127'
  },
  {
    'id': 126,
    'title': 'How do I include a custom error message in active record validations?',
    'content': '<p>I\'d like to be able to define in my model a validation like:</p>\n<pre class="language-ruby"><code>validates :task_management_id, presence: true, message: "Please select a task"</code></pre>\n<p>However, I get an error when I do this ^^^&nbsp;</p>\n<p>How do I include this custom message with activerecord validation?</p>',
    'votes_count': 2,
    'answers_count': 2,
    'comments_count': 0,
    'views': 39,
    'created_at': '2016-06-18T23:01:40.571Z',
    'updated_at': '2016-06-30T16:24:15.417Z',
    'user': {
        'id': 84,
        'name': 'Mayowa Pitan',
        'points': 26,
        'image': 'https://lh5.googleusercontent.com/-709fFeD_FK4/AAAAAAAAAAI/AAAAAAAAACI/TJCfSBxmuZY/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/84.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/126'
  },
  {
    'id': 124,
    'title': 'How can I order from Amazon with the help of Andela?',
    'content': '<p>How can I make orders from Amazon through Andela, and whose Name and Phone Number do I fill in the shipping details?</p>',
    'votes_count': 4,
    'answers_count': 2,
    'comments_count': 0,
    'views': 181,
    'created_at': '2016-06-13T11:07:45.333Z',
    'updated_at': '2016-06-24T01:35:01.655Z',
    'user': {
        'id': 90,
        'name': 'Seyi Adekoya',
        'points': 110,
        'image': 'https://lh3.googleusercontent.com/-TmaBMhYx8mU/AAAAAAAAAAI/AAAAAAAAABg/clWfb3kLxZc/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/90.json'
      },
    'tags': [
        {
          'id': 12,
          'name': 'lagos',
          'representative_id': 11
        },
        {
          'id': 56,
          'name': 'ny-office',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/124'
  },
  {
    'id': 123,
    'title': 'Why are the Andela ballers not participating in competitive tournament like the Fit-Eagles',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>There are quite a number of fellows interested in Basketball. While some are just fans of the game, many of them are actively playing the game.&nbsp;</p>\n<p>The slack channel&nbsp;<strong>#ballers</strong>&nbsp;has over 20 active members where they discuss and schedule training.&nbsp;With such followership I am surprised that the team has never been involved in any competition like the Andela Fit-Eagles&nbsp;&nbsp;</p>\n</div>',
    'votes_count': 2,
    'answers_count': 1,
    'comments_count': 1,
    'views': 72,
    'created_at': '2016-06-10T18:09:47.530Z',
    'updated_at': '2016-06-22T10:39:24.896Z',
    'user': {
        'id': 68,
        'name': 'Daniel Okocha',
        'points': 20,
        'image': 'https://lh6.googleusercontent.com/-tl_77rYBU3g/AAAAAAAAAAI/AAAAAAAAABc/2zj2JJf9Evs/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/68.json'
      },
    'tags': [
        {
          'id': 23,
          'name': 'football',
          'representative_id': null
        },
        {
          'id': 57,
          'name': 'fellows',
          'representative_id': 18
        },
        {
          'id': 11,
          'name': 'fellows-lagos',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/123'
  },
  {
    'id': 122,
    'title': 'Should join tables have an id column?',
    'content': '<p>Recently, I read a post of someone who was trying to fetch the first row of a join table from a DB, but kept getting an error of the <code>id</code>&nbsp;column not being found.</p>\n<p>I\'ve seen similar questions on Stack Overflow and most recently an&nbsp;<a href="https://github.com/rails/rails/issues/25347" target="_blank">issue on Rails(Github)</a>.</p>\n<p>I was wondering if it makes sense for a join table to have an id column?</p>\n<p>If it doesn\'t, could you explain how other languages/frameworks worked around this limitation?</p>',
    'votes_count': 0,
    'answers_count': 2,
    'comments_count': 0,
    'views': 65,
    'created_at': '2016-06-10T15:58:19.820Z',
    'updated_at': '2016-07-05T18:56:05.798Z',
    'user': {
        'id': 3,
        'name': 'Oreoluwa A',
        'points': 273,
        'image': 'https://lh4.googleusercontent.com/-GXaO4vGuCwI/AAAAAAAAAAI/AAAAAAAAABY/eSjUIg-vG68/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/3.json'
      },
    'tags': [
        {
          'id': 6,
          'name': 'javascript',
          'representative_id': null
        },
        {
          'id': 9,
          'name': 'python',
          'representative_id': null
        },
        {
          'id': 10,
          'name': 'database',
          'representative_id': null
        },
        {
          'id': 34,
          'name': 'database-relationships',
          'representative_id': null
        },
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/122'
  },
  {
    'id': 121,
    'title': 'Andela History',
    'content': '<p>Is there any documentation on how Andela started that one can refer to ?</p>',
    'votes_count': 1,
    'answers_count': 2,
    'comments_count': 1,
    'views': 68,
    'created_at': '2016-06-10T12:13:43.865Z',
    'updated_at': '2016-06-30T16:30:50.638Z',
    'user': {
        'id': 1,
        'name': 'Blessing Ebowe',
        'points': 123,
        'image': 'https://lh3.googleusercontent.com/-zOGYgaSXznw/AAAAAAAAAAI/AAAAAAAAADQ/8WAg6pb1Kx8/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/1.json'
      },
    'tags': [
        {
          'id': 57,
          'name': 'fellows',
          'representative_id': 18
        },
        {
          'id': 24,
          'name': 'andela-history',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/121'
  },
  {
    'id': 120,
    'title': 'How can I get json and activerecord object of the same data?',
    'content': '<p>In my controller, I have this:@events = Event.all</p>\n<pre class="language-markup"><code>@events = Event.all\n</code></pre>\n<p>In my view, I made use of @events. However, in addition I need the json version of my data. On converting to json with</p>\n<p>&nbsp;</p>\n<pre class="language-markup"><code>function all_events(){\n  return JSON.parse("&lt;%= @events.to_json %&gt;");\n}</code></pre>\n<p class="p1">But here is the error I get:</p>\n<pre class="language-markup"><code>Uncaught SyntaxError: Unexpected token &amp;(&hellip;)</code></pre>\n<p>On logging my result, He is what I found. <code>to_json</code>&nbsp;made my data look like this:</p>\n<pre class="language-markup"><code>[{&amp;quot;id&amp;quot;:1,&amp;quot;title&amp;quot;:&amp;quot;We Love Code&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;We are bent on raising a band of passionate developers who will take their skill and turn it into solutions for the community&amp;quot;,&amp;quot;location&amp;quot;:&amp;quot;Oregon, United States&amp;quot;,&amp;quot;start_date&amp;quot;:&amp;quot;2016-05-09T00:00:00.000Z&amp;quot;,&amp;quot;end_date&amp;quot;:&amp;quot;2016-05-13T00:00:00.000Z&amp;quot;,&amp;quot;image&amp;quot;:{&amp;quot;url&amp;quot;:&amp;quot;http://res.cloudinary.com/neddinn/image/upload/v1461690497/xzl4oqiz2n5waljb&hellip;1,&amp;quot;enabled&amp;quot;:false},{&amp;quot;id&amp;quot;:2,&amp;quot;title&amp;quot;:&amp;quot;Not for the Crowd&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;This is an event where we gather the most passionate members of the community to teach and empower them on making a difference. It would not be an easy journey I assure you. But it would be worth while&amp;quot;,&amp;quot;location&amp;quot;:&amp;quot;Arizona, United States&amp;quot;,&amp;quot;start_date&amp;quot;:&amp;quot;2016-05-17T13:36:09.864Z&amp;quot;,&amp;quot;end_date&amp;quot;:&amp;quot;2016-05-17T13:36:13.977Z&amp;quot;,&amp;quot;image&amp;quot;:{&amp;quot;url&amp;quot;:&amp;quot;http://res.cloudinary.com/neddinn/image/upload/v1462965114/hjhkdvpughdar7fg&hellip;at&amp;quot;:&amp;quot;2016-05-16T13:36:25.379Z&amp;quot;,&amp;quot;venue&amp;quot;:&amp;quot;Love Child Style&amp;quot;,&amp;quot;event_template_id&amp;quot;:12,&amp;quot;map_url&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;manager_profile_id&amp;quot;:1,&amp;quot;enabled&amp;quot;:false}]</code></pre>\n<p>Here is what I did eventually:</p>\n<pre class="language-markup"><code>function all_events(){\n  return JSON.parse($(\'&lt;div /&gt;\').html("&lt;%= @events.to_json %&gt;").text());\n}</code></pre>\n<p>The code above renders the data into an html element and extracts the data as text. By doing this, "&amp;quot; (escaped html for double quote)" has changed to \'" (double quotes)\'. I have a feeling this is not the best approach. What better way to go about this?</p>',
    'votes_count': 1,
    'answers_count': 2,
    'comments_count': 2,
    'views': 67,
    'created_at': '2016-06-09T16:11:43.296Z',
    'updated_at': '2016-07-11T21:22:46.249Z',
    'user': {
        'id': 25,
        'name': 'Femi Senjobi',
        'points': 52,
        'image': 'https://lh3.googleusercontent.com/-qXUa95rVobM/AAAAAAAAAAI/AAAAAAAAAAw/r0Os6fuy4r0/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/25.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        },
        {
          'id': 6,
          'name': 'javascript',
          'representative_id': null
        },
        {
          'id': 33,
          'name': 'ruby',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/120'
  },
  {
    'id': 119,
    'title': 'How do I click a js: true link and have it submit like a javascript request when testing with rspec/capybara?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>I have a <code>remote: true</code>&nbsp;link that renders a form on the page using javascript.</p>\n<p>&nbsp;</p>\n<p>Currently, I\'m realizing that clicking on this link doesn\'t submit the request as javascript, even after changing <code>capybara default driver</code>&nbsp;to its&nbsp;<code>javascript</code>&nbsp;driver or tagging that scenario as <code>@javascript</code>&nbsp;.</p>\n<p>What\'s basically still missing?</p>\n</div>\n</div>',
    'votes_count': 0,
    'answers_count': 0,
    'comments_count': 14,
    'views': 81,
    'created_at': '2016-06-09T10:29:37.408Z',
    'updated_at': '2016-07-06T00:01:29.406Z',
    'user': {
        'id': 2,
        'name': 'Innocent Amadi',
        'points': 268,
        'image': 'https://lh5.googleusercontent.com/-ha9ZnATm5KY/AAAAAAAAAAI/AAAAAAAAADg/x2B7RyVnD-M/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/2.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/119'
  },
  {
    'id': 116,
    'title': 'How do I locate the nearest KBL Health Facility?',
    'content': '<p>Where is the nearest KBL HealthCare Provider located and what services do they provide? Also, it would be interesting to get an update on BUPA!</p>',
    'votes_count': 1,
    'answers_count': 2,
    'comments_count': 4,
    'views': 107,
    'created_at': '2016-06-02T06:00:33.796Z',
    'updated_at': '2016-06-21T16:25:24.718Z',
    'user': {
        'id': 3,
        'name': 'Oreoluwa A',
        'points': 273,
        'image': 'https://lh4.googleusercontent.com/-GXaO4vGuCwI/AAAAAAAAAAI/AAAAAAAAABY/eSjUIg-vG68/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/3.json'
      },
    'tags': [
        {
          'id': 26,
          'name': 'bupa',
          'representative_id': 27
        },
        {
          'id': 11,
          'name': 'fellows-lagos',
          'representative_id': null
        },
        {
          'id': 4,
          'name': 'operations',
          'representative_id': null
        },
        {
          'id': 27,
          'name': 'healthcare',
          'representative_id': null
        },
        {
          'id': 25,
          'name': 'kbl',
          'representative_id': 27
        },
        {
          'id': 12,
          'name': 'lagos',
          'representative_id': 11
        },
        {
          'id': 5,
          'name': 'societies',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/116'
  },
  {
    'id': 115,
    'title': 'How can I change the name of a table and its columns in one Migration?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>I want to change the name of a table and also some of its columns. How can I do all these in one Migration?</p>\n</div>\n</div>',
    'votes_count': 1,
    'answers_count': 3,
    'comments_count': 0,
    'views': 98,
    'created_at': '2016-06-01T10:49:55.966Z',
    'updated_at': '2016-06-13T07:01:21.457Z',
    'user': {
        'id': 5,
        'name': 'Adebayo Adepoju',
        'points': 123,
        'image': 'https://lh5.googleusercontent.com/-P0_NF5qwOc0/AAAAAAAAAAI/AAAAAAAAADw/dP_D_ZTdRXw/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/5.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/115'
  },
  {
    'id': 114,
    'title': 'How much memory and space is recommended for a Virtual Machine intended to run Ubuntu, Rails (an ERP module) and a database ?',
    'content': '<p>I have to give recommendations of the space and memory that a VM where Ubuntu 15.05 and Rails are to be installed. &nbsp;<br />How&nbsp;much memory and space should be allocated to that environment?</p>\n<p>Do I give recommendations based off just the size of the OS and Rails now?</p>\n<p>How much could the potential DB growth hamper these projections?</p>\n<p>If I were to put users into consideration, how much physical memory should be sufficient for an app that\'s expecting at least 500 users at a time?</p>',
    'votes_count': 0,
    'answers_count': 2,
    'comments_count': 0,
    'views': 70,
    'created_at': '2016-05-31T19:33:58.219Z',
    'updated_at': '2016-06-20T11:43:12.748Z',
    'user': {
        'id': 2,
        'name': 'Innocent Amadi',
        'points': 268,
        'image': 'https://lh5.googleusercontent.com/-ha9ZnATm5KY/AAAAAAAAAAI/AAAAAAAAADg/x2B7RyVnD-M/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/2.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        },
        {
          'id': 22,
          'name': 'devops',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/114'
  },
  {
    'id': 113,
    'title': 'How do I write a new test when I only changed one line of code?',
    'content': '<p>Hi pals,&nbsp;</p>\n<p>I fixed a bug by just <span style="background-color: #ffff99;">changing a line in an omniauth file</span> to restore proper authentication to my simulations app. This will normally go on fine but I have a team lead that insists we test every feature that we happen to work on.</p>\n<p>How do I test for other specs (What can I really test for) asides feature specs</p>',
    'votes_count': 0,
    'answers_count': 1,
    'comments_count': 2,
    'views': 60,
    'created_at': '2016-05-31T16:40:05.510Z',
    'updated_at': '2016-06-29T18:02:19.636Z',
    'user': {
        'id': 84,
        'name': 'Mayowa Pitan',
        'points': 26,
        'image': 'https://lh5.googleusercontent.com/-709fFeD_FK4/AAAAAAAAAAI/AAAAAAAAACI/TJCfSBxmuZY/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/84.json'
      },
    'tags': [
        {
          'id': 2,
          'name': 'rails',
          'representative_id': null
        },
        {
          'id': 14,
          'name': 'simulations',
          'representative_id': 15
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/113'
  },
  {
    'id': 112,
    'title': 'Why is asking questions on Zhishi better than asking an individual on slack?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>I would like to know why we advise Andelans&nbsp;to use Zhishi instead&nbsp;of just reaching out to anyone on slack.</p>\n</div>',
    'votes_count': 3,
    'answers_count': 2,
    'comments_count': 0,
    'views': 104,
    'created_at': '2016-05-31T09:01:49.511Z',
    'updated_at': '2016-07-03T10:41:06.362Z',
    'user': {
        'id': 5,
        'name': 'Adebayo Adepoju',
        'points': 123,
        'image': 'https://lh5.googleusercontent.com/-P0_NF5qwOc0/AAAAAAAAAAI/AAAAAAAAADw/dP_D_ZTdRXw/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/5.json'
      },
    'tags': [
        {
          'id': 11,
          'name': 'fellows-lagos',
          'representative_id': null
        },
        {
          'id': 18,
          'name': 'nairobi-fellows',
          'representative_id': null
        },
        {
          'id': 3,
          'name': 'success',
          'representative_id': null
        },
        {
          'id': 4,
          'name': 'operations',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/112'
  },
  {
    'id': 111,
    'title': 'How many Societies do we have?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>Actually, this is a "two in one" question.</p>\n<ol>\n<li>How many societies does we have in Andela and what are their names?</li>\n<li>I notice that fellows are assigned to the societies based on cohorts, i.e each cohort belongs to a specific society. I\'ll like to know the cohort distribution so far.</li>\n</ol>\n</div>\n</div>\n</div>',
    'votes_count': 1,
    'answers_count': 2,
    'comments_count': 3,
    'views': 70,
    'created_at': '2016-05-30T11:29:15.480Z',
    'updated_at': '2016-06-20T19:36:42.119Z',
    'user': {
        'id': 49,
        'name': 'Osmond Oranagwa',
        'points': 223,
        'image': 'https://lh3.googleusercontent.com/-0f_Ad-u24v8/AAAAAAAAAAI/AAAAAAAAABI/zaV-WPY2wFM/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/49.json'
      },
    'tags': [
        {
          'id': 3,
          'name': 'success',
          'representative_id': null
        },
        {
          'id': 5,
          'name': 'societies',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/111'
  },
  {
    'id': 110,
    'title': 'What makes a language slow?',
    'content': '<p>There\'s the constant comparism of various programming languages with respect to their speed. Ruby is slower than Python, PHP5 is way slower that PHP7<span style="font-size: 0.875em; line-height: 1.4;">, C is faster than them all</span><span style="font-size: 0.875em; line-height: 1.4;">&nbsp;etc.&nbsp;</span></p>\n<p><span style="font-size: 0.875em; line-height: 1.4;">I understand the cost in converting different languguages to machine code and the possible impact on speed (at least for interpreted languages), but then everybody eventually get\'s down to machine code one way or the other; at that point I will think everyone has equal footing. Or do some languages end up with inefficent machine code?</span><span style="font-size: 0.875em; line-height: 1.4;">Take the case of PHP, what did they do or stop doing in PHP5 that resulted in the hugh performance gain in PHP7?</span></p>',
    'votes_count': 2,
    'answers_count': 0,
    'comments_count': 2,
    'views': 50,
    'created_at': '2016-05-30T11:17:07.746Z',
    'updated_at': '2016-06-29T10:23:14.738Z',
    'user': {
        'id': 49,
        'name': 'Osmond Oranagwa',
        'points': 223,
        'image': 'https://lh3.googleusercontent.com/-0f_Ad-u24v8/AAAAAAAAAAI/AAAAAAAAABI/zaV-WPY2wFM/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/49.json'
      },
    'tags': [
        {
          'id': 15,
          'name': 'training',
          'representative_id': null
        },
        {
          'id': 19,
          'name': 'php',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/110'
  },
  {
    'id': 107,
    'title': 'Can I spin up a linux server on a VM that has other Windows servers on it?',
    'content': '<div data-reactid=".0.0.1.0.0.0.1.0.0.1.0.1.1.0">\n<p>So there\'s a VM currently hold windows servers.</p>\n<p>Do you know if we could spin up a linux server on a VM that has other Windows servers on it? &nbsp;If it\'s possible, how best should it be done?</p>\n<p>&nbsp;</p>\n</div>',
    'votes_count': 0,
    'answers_count': 1,
    'comments_count': 1,
    'views': 51,
    'created_at': '2016-05-28T01:37:58.636Z',
    'updated_at': '2016-06-13T11:19:54.642Z',
    'user': {
        'id': 2,
        'name': 'Innocent Amadi',
        'points': 268,
        'image': 'https://lh5.googleusercontent.com/-ha9ZnATm5KY/AAAAAAAAAAI/AAAAAAAAADg/x2B7RyVnD-M/photo.jpg',
        'url': 'http://zhishi-engine.herokuapp.com/users/2.json'
      },
    'tags': [
        {
          'id': 22,
          'name': 'devops',
          'representative_id': null
        }
      ],
    'url': 'http://zhishi-engine.herokuapp.com/questions/107'
  }
];
