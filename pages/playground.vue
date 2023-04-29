<template>
  <v-dialog v-model="showSummarize" style="max-width: 60vh; min-width: 400px">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="1">
            <v-icon icon="mdi-auto-fix" size="26"></v-icon>
          </v-col>
          <v-col>
            Summarization
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        Yeah, like fairly frequently, I don't know, I was just on this expedition in the jungle and guy a nose like a
        National Geographic TV show thing and enough resold the wall, we put up just just because the Tiber Rock we were
        on.
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-container fluid>
    <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
    <div class="ml-4 text-h4 text-primary">Playground</div>
    <v-row class="mt-5" justify="center">
      <v-col style="text-align: center;">
        <video ref="current_podcast" src="/videos/podcast.mp4" controls
          style="object-fit: contain;width: 100%;height: 100%;"></video>
      </v-col>
    </v-row>

    <v-container style="overflow-y: scroll; height: 35vw;">
      <template v-if="currentStep === 'index'">
        <v-row justify="space-between" align="center">
          <v-col> <v-chip-group class="text-primary"><v-chip v-for="topic in ['basket', 'frogs', 'climbing']"
                :key="topic">{{
                  topic
                }}</v-chip></v-chip-group></v-col>
          <v-col>
            <div style="text-align: end;">
              <v-btn @click="moveToCreateSummarizationSection">Create summarization</v-btn>
            </div>

          </v-col>
        </v-row>
      </template>
      <template v-if="currentStep === 'index'">
        <div style="overflow-y: scroll; height: 35vw;">
          <v-row v-for=" (t, index) in transcriptions " class=" my-3">
            <v-card>
              <v-card-subtitle>{{ formatSeconds(t.start_time) }} -> {{ formatSeconds(t.end_time) }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="1"><v-btn @click="setVideoTimestamp(t.start_time)" icon="mdi-play"></v-btn></v-col>
                  <v-col>{{ t.transcription }}</v-col>
                  <v-col cols="1">
                    <v-checkbox color="primary" v-model="selectedTranscriptions" label="" :value="index"></v-checkbox>
                  </v-col>
                </v-row>

              </v-card-text>

            </v-card>
          </v-row>
        </div>

      </template>
      <template v-if="currentStep === 'create-summarization'">
        <v-row justify="space-between" align="center">
          <v-col>
            <div class="text-h5 text-primary">New Summarization</div>
          </v-col>
          <v-col>
            <div style="display:flex; justify-content: right; ">
              <v-btn rounded="xs" color="grey-lighten-5" class="mx-1" @click="currentStep = 'index'">Cancel</v-btn>
              <v-btn rounded="xs" class="mx-1" @click="createSummarization">Create</v-btn>
            </div>


          </v-col>
        </v-row>
      </template>

      <template v-if="currentStep === 'create-summarization'">
        <v-form ref="new-summarization-form">
          <v-row>
            <v-text-field label="Título del resumen" color="primary" v-model="newSummarizationTitle"
              :rules="[v => !!v || 'El título es obligatorio']"></v-text-field>
          </v-row>
        </v-form>
        <div style="overflow-y: scroll; height: 25vw;">
          <v-row v-for=" tIndex in selectedTranscriptions " class=" my-3">
            <v-card>
              <v-card-subtitle>{{ formatSeconds(transcriptions[tIndex].start_time) }} -> {{
                formatSeconds(transcriptions[tIndex].end_time)
              }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="1"><v-btn @click="setVideoTimestamp(transcriptions[tIndex].start_time)"
                      icon="mdi-play"></v-btn></v-col>
                  <v-col>{{ transcriptions[tIndex].transcription }}</v-col>
                </v-row>
              </v-card-text>

            </v-card>
          </v-row>
        </div>

      </template>
    </v-container>
  </v-container>
</template>

<script>
const transcriptions = [
  {
    "transcription": "The Joe Rogan Experience. How often are you doing these free solo climbs? You know, I'm working on things. Yeah, like fairly frequently, I don't know, I was just on this expedition in the jungle and guy a nose like a National Geographic TV show thing and enough resold the wall, we put up just just because the Tiber Rock we were on. No one's ever so little wall like that before. So I felt like since we were there's felt almost an obligation to do it just for like this climbing history, you know, you're going through.",
    "start_time": 1,
    "end_time": 29.000000029
  },
  {
    "transcription": " There. And you have the opportunity to kind of have to know when you see something like that. Do you make a route first with ropes? Always. Yeah. Yeah. So, our, I mean, because we were there, I mean, it's a whole like complicated and action graphic TV thing. So, we were there with biologists, we're like studying these endemic species of the two buoys. There's like this whole interesting Natural History component to it for sure biology component but but we were just trying to climb this mountain. That is never been climbed before. So the priority is obviously just get up at to like find these species of frogs to like, do all the things that are important for the TV show, but",
    "start_time": 30,
    "end_time": 59.000000059
  },
  {
    "transcription": " But then because I was there, I was like oh you know, on the side I can at least do something that I'm proud of and climbing. That's also pretty cool. Wow, that's pretty cool. Yeah. Seems like this like pretty and it wound up being totally insane climbing like really cool like this overhanging wall of six 700 feet high you know like dangling. It's it was kind of the best style of climbing to solo because it felt secure like it's type of climbing where you feel safe. Like it's very, very good rock. So anything you hold onto, you know, solid it's not going to break and it also lends itself to these sort of",
    "start_time": 60.6,
    "end_time": 89.000000089
  },
  {
    "transcription": " Ian's in the rock where you can like wedge your hand in it, like feel really secure but also it's incredible exposure because it's really steep like because you're in the jungle you can only climb stuff that's overhanging because anything that's like less than anything else accumulates like water. And during wines with plants all over it. So that the only stuff is really climbable is the stuff that is sheltered from the rain so that doesn't have plants on it. So so it's difficult just by Nature. Yes, it's difficult because you're hanging and so you're liking these crazy positions where you're dangling from your arms but you feel safe doing it because the rocks",
    "start_time": 89.9,
    "end_time": 119.000000119
  },
  {
    "transcription": " Good in the holds are so good and you're just like, what a crazy place is really cool, but then when you get to the very edge, you have to somehow. Yeah. Yeah. Way. And that's a bummer. Yeah. That seems like the most gnarly part of it. It will are actually probably in terms of risk. It probably was the final 20 or 30 feet of like getting onto the top. It's all like rotten soil and those rocks in like you know yeah it wasn't ideal. But how do you decide which way to go when you get to something like that? Just what's the most likely path to success? Yeah. Well so in that particular",
    "start_time": 120,
    "end_time": 149.000000149
  },
  {
    "transcription": " Particular case, we had already established the route, you know like because it's this TV thing, we'd already climbed it, we put ropes up but we'd like work down at the camera guys, it gone up and down. We'd like camped up on this ledge to look for these frogs we'd like to own this whole experience. So for the free solo, I already had a pretty good sense of like how I should tackle that part because, you know, we'd already been sort of living up there a bit but wow.",
    "start_time": 149.9,
    "end_time": 171.000000171
  },
  {
    "transcription": " But I'm like, what do you do in February? You know, that like that's that's my February. So these frogs like the idea is to is it really an excuse to climb? Or is it like, do you really? Are you really there for the frogs to check out these weird species a little bit of both? Yeah. Well I'm like I know this is a long form showed you want to like yeah go deep into it because because it's actually really interesting so our long form because it's so it's so",
    "start_time": 173.5,
    "end_time": 201.000000201
  },
  {
    "transcription": " The trip was the trip, is crazy. I mean, we deserve a holdup. I've read freaking eight books while we were there because it's the jungle and, you know, it's the tropics. So it's dark from 6:00 to 6:00 every day it's like 12 hours, a dark, and we're in our own little hammock. So I was just in my book cocoon like reading books every day and so the headlamp. Yeah, yeah. But headlamp because you have nothing else to do is like raining and you're just in your own little, like personal cocoon, just like reading. But um, so I read like natural history of ground and natural history, like, you know, sort of the, the, the geology.",
    "start_time": 202.3,
    "end_time": 232.000000232
  },
  {
    "transcription": " So, like if you seen the movie up like the Pixar Disney movie, the queue thing with a flying house and the balloons. Yeah. So you know, that's all modelled on like where they fly to the big rock things with the waterfalls. Those are two buoys, which are like real things in South America, that's in Venezuela Guyana. And the northern part of Brazil, or if you've seen the new Point Break, they film down there on the same Rock features. I didn't see but so you're not missing anything. No, it's a really bad but but a lot of my friends worked on it. So it's like it's cool and it is",
    "start_time": 232.4,
    "end_time": 261.000000261
  },
  {
    "transcription": " Like an incredible climbing place and a respectable Patrick Swayze. I just, yeah, exactly. Yeah, you didn't miss anything. I actually fell asleep. Watching it on a plane really when you fall asleep during action movie or kind of like, come on. Yeah, but I'm but the climbing. It's cool and it anyway. So it was on these things called the buoys which you like these big Court citic Sandstone walls that stick out of the Jungle. And so if you imagine a huge raised area of land that because it's in the jungle has been massively eroded by the constant rain.",
    "start_time": 262.3,
    "end_time": 292.000000292
  },
  {
    "transcription": " The last 40 million years. So now you wind up with all these like Slender sort of towers and maces, you know. So like, you know, Angel Falls like no, it's one of the biggest waterfalls in the world here. Like pull up a picture, Angel Falls is a psych. Oh yeah, yeah, there we go. That's a, that's a rhyme and that's, you know, that is that's what we're wise. Yes, it's so beautiful. So if you could looks fake. Yeah, it does. Look fake. Isn't it crazy? I'm pretty sure that one is ramen. If you look to the left of the one, you were just on that. We climb this little wall to the left of us. Can you go back?",
    "start_time": 292.2,
    "end_time": 322.000000322
  },
  {
    "transcription": " That one Jamie because like, if I was a dumbass so, so that would think someone built that. Totally. So if you could pan that photo to the left though, obviously, you can't because not in the frame. We climbed this little mountain to the left. And so this is a really famous because the summit of it marks the boundary between Brazil, Venezuela and Guyana. It's used as like the marker to separate the three countries and so we were climbing this sort of little bastard stepbrother next to it. But would you know that Peak though had never been climbed? It was like new to science for the different species of frogs and all that kind of stuff. If you an Explorer and",
    "start_time": 322.3,
    "end_time": 352
  },
  {
    "transcription": " You've stumbled upon that. You would think that. That was like a structure. Yeah. Look, it's so square and flat down and some. And some of them did like European explorers that first came into the region, had all kinds of names, like the white Cathedral and things like that, like that Tower. They're just a bunch of. I look at that one. Click on the one, your cursors on Jimmy. That's so actually. So again, so actually you see on the left side of that, there's like the hint of a little thing in the distance that I'm pretty sure. That's the thing. We were climbing. The thing to the left, this like just starting to appear out of the clouds. Yeah, I'm pretty sure that's the peak that we found God. It's",
    "start_time": 352.2,
    "end_time": 382.000000382
  },
  {
    "transcription": " Oh, beautiful. Yeah, yeah, it's crazy. Except to be fair, the sun only comes out like so we were there in the dry season and it rained like eight hours a day and we were in the clouds non-stop who's totally grim. And that's right. Yeah and so you see these pictures where you're like, it's so beautiful and you're like yeah for 30 minutes a day, you know, and the rest of the time you're just in the get in the water. Yeah again work. That's so wild man. Like really if I stumbled upon that I would think someone built that. Yeah. No it's totally incredible. What is the joint? I didn't even get to the cool part of it so it was so yeah.",
    "start_time": 382.3,
    "end_time": 412.000000412
  },
  {
    "transcription": " Yeah, asking about the geology. Yeah. Like how does something like that form? It's so strange. Yeah, so that's the stuff I was reading while we there. So it's like this huge bed of sandstone which then gets metamorphose like compressed into quartzite. So I really really hard sandstone and then you know, the Andes. So you have gondwana like one of the mega continents that predates Pangaea I think like, yeah. So like, you know, you imagine all the continents on earth where one sort of combined so South America and Africa, you know, fit together.",
    "start_time": 412.2,
    "end_time": 442.000000442
  },
  {
    "transcription": " The horn. And so, this rock is most similar to rock into parts of Africa, actually, and so, in part of what makes the biology there. So interesting is that the creatures on the summit of some of the Puris are more closely related to creatures in Africa than they are to the ones in the jungle below them, because because the Summits have been separated for so long. You see I'm saying like because the top of that, those islands, basically, they've been separated from the jungle below for so long that they",
    "start_time": 442.4,
    "end_time": 472.000000472
  },
  {
    "transcription": " More closely resemble where they came from in Africa. Then the creatures that live in the rainforest below. It's like this, totally incredible, you know, I mean, it's just, it's just an interesting part of Earth. Are you aware of the olmecs? Do you know what the Olmec civilization was? No, the whole mix of it's really, it's a, quite a mystery, they don't exactly know what they did, or you know what, what their culture was all about. But they had these heads that they left Behind These sculpted gigantic, Stone heads.",
    "start_time": 472.2,
    "end_time": 502.000000502
  },
  {
    "transcription": " That resemble resemble African people. That's not the Easter Island stuff. Oh, yeah. Oh no, that's different artists different. This is the olmecs. Oh, wow, where and where were the olmecs? The South America. Oh yes. Oh my gosh, yes, South America, Mexico, Central America. And there's a lot of them and these images are very African looking faces, and they don't really know what the history of the war, huh. And they know they think some of them",
    "start_time": 502.4,
    "end_time": 532.000000532
  },
  {
    "transcription": " Um, existed in the neighborhood of 6,000 years ago. But, you know, when you're, when you're looking at Stone, it's hard because they just the carbon date, the stuff that's around the stone as the on Earth it, but that doesn't really necessarily give them an accurate sense of when it was constructed. It just gives an accurate sense of how the sediments are of where it's around a at her. So, because the stuff we're gonna do, is, we're gonna ends on totally different scale, like the the stuff that I'm talking about, the I think that",
    "start_time": 532.2,
    "end_time": 562.000000562
  },
  {
    "transcription": " Louise have been eroded away, like isolated 440 million years or something which you know far predates humans and then I think the rock itself is like 1.5 billion years old. It's like Ancient Ancient. It's incredible Rock, that's really cool. That's so wild. The way it formed the look. Yeah, it's funny because I mean you saw the pictures that looks like islands and you know, early explorers thought that they must be Islands or something but it's actually just the eroded remnants of what was once like a giant, you know, elevated.",
    "start_time": 562.3,
    "end_time": 592.000000592
  },
  {
    "transcription": " Aa. Oh, yeah, totally. So, this is what the summit's look like a bunch of photos. Like that on my phone. It's just like scrappy little iPhone pics of like, here we are on this crazy, you know, because you're like in the clouds, you're in the Mist. It's like kind of grim, and it's raining, but then the Summit is like this totally wild. So like all those plants are incredibly well, adapted to this harsh environment and they're they're really high rates of corn every like plants that eat things because they're busy, no soil, one of the books. I read said that described it as a rain desert like you think of a desert",
    "start_time": 592.2,
    "end_time": 622.000000622
  },
  {
    "transcription": " Having lots of soil, but no water. And there you have infinite water but no soil, because it's a stone surface. It's getting rained on so much that. It washes all the soil away. Oh, wow. So for any of the vegetation to live there, they basically all have different strategies, where they're routed straight to the stone and then they, they eat, you know, they eat bugs and things that, you know, they eat insects or they eat other plants or the, you know, the lots of plants that grow on plants and it's just like a whole crazy Web of Life that's like really different than what you expected.",
    "start_time": 622.3,
    "end_time": 652.000000652
  },
  {
    "transcription": " You know, it's weird because it's so abundant. Yeah it's got It's an unusual form of life but it's everywhere. Yeah. Like no, that's so rich in green. But you'd have. Yeah, though, actually, I bet if in that photo, if you Pan the photo, but at the side, there'd be like big expanses of bare rock because the Summits like, yeah, they're little pastors and things, it's almost like Alpine Meadows. If you go into the mountains and in the northern hemisphere, they'll be like hi Tundras and things. Where it's like, yeah, feels really Lush. But then there's also a lot of exposed rock because when the sun comes out, you know you're at seven to nine thousand feet in.",
    "start_time": 652.2,
    "end_time": 682.000000682
  },
  {
    "transcription": " Tropic. So it's really intense UV exposure and it drives things out instantly. So it's really hard hard climatic conditions for Life. Wow, that's wild. And so these organisms, these creatures that live up there. They're closely resembling creatures that live in Africa, and so, that was part of what you're studying. Yeah, so we were with this biologist who is trying to do an elevational transect of of the River Basin that we were in. So, basically, starting from the rainforest, where the frogs are pretty well known and then going up through the cloud forest, which is kind of, as you gain elevation to the actual",
    "start_time": 682.2,
    "end_time": 712.000000712
  },
  {
    "transcription": " all and then the species all changes you can elevation which is kind of normal and then the things on the summit of the tipu, he's on the summit of the stone Island are completely different again and so he's basically doing research on how how the different species, you know, basically what the deal is catch new episodes of The Joe Rogan Experience for free, only on Spotify, watch back catalogue, JRE videos on Spotify including Clips easily seamlessly switch.",
    "start_time": 712.2,
    "end_time": 742.000000742
  },
  {
    "transcription": " Which between video and audio experience on Spotify. You can listen to the JRE in the background. While using other apps and can download episodes to save on data cost, all for free Spotify is absolutely free. You don't have to have a premium account to watch new JRE episodes. You just need to search for the JRE on your Spotify app. Go to Spotify now, to get this full episode of The Joe Rogan Experience.",
    "start_time": 742.2,
    "end_time": 769.000000769
  }
]
import format from "format-duration"

export default {
  name: "PlaygroundPage",
  data: () => ({
    transcriptions,
    newSummarizationTitle: "",
    showSummarize: false,
    currentStep: "index",
    selectedTranscriptions: []
  }),
  mounted() {
    console.log(this.$refs.current_podcast)
  },
  methods: {
    moveToCreateSummarizationSection() {
      if (!this.selectedTranscriptions.length) {
        this.$swal.fire("Create Summary", "You have to select at least one transcript", "error")
        return;
      }
      this.currentStep = 'create-summarization'

    },
    formatSeconds(seconds) {
      return format(seconds * 1e3)
    },
    setVideoTimestamp(t) {
      this.$refs.current_podcast.pause()
      this.$refs.current_podcast.currentTime = t
      this.$refs.current_podcast.play()
    },
    async createSummarization() {
      const { valid } = await this.$refs["new-summarization-form"].validate()
      if (valid) {
        this.$swal.fire("Create Summary", "Your summary is being processed!", "success")
      }
      this.$refs["new-summarization-form"].reset()
    }
  }
};
</script>
