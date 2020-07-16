<template>
    <div class="contact-container">
      <div class="contact-title">
        <h2>We don’t just Think Different<br />We’re Think Better</h2>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-spacer />
          <v-row>
            <v-col>
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="20"
                label="First name"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="20"
                label="Last name"
                required
              />
            </v-col>
          </v-row>
          <v-spacer />
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="subject"
                :rules="subjectRules"
                :counter="30"
                label="Subject"
                required
              />
            </v-col>
          </v-row>
          <v-spacer />
          <v-row>
            <v-col>
              <v-textarea
                v-model="message"
                :rules="messageRules"
                :counter="750"
                label="Message"
                required
                auto-grow
              />
            </v-col>
          </v-row>
          <v-spacer />
          <v-row>
            <v-col>
              <v-btn :disabled="!valid" outlined v-bind="size" @click="submit">
                send message
              </v-btn>
              {{ formMessage }}
            </v-col>
          </v-row>
          <v-spacer />
        </v-container>
      </v-form>
    </div>
</template>

<script>

export default {
  data () {
    return {
      contact: [],
      valid: true,
      formMessage: '',
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      subject: '',
      subjectRules: [
        v => !!v || 'Subject is required',
        v => (v && v.length <= 30) || 'Subject must be less than 30 characters'
      ],
      message: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 750) || 'Message must be less than 750 characters'
      ]
    }
  },
  computed: {
    size () {
      const size = { sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  methods: {
    submit () {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'test@gmail.com',
          from: 'test@gmail.com',
          replyTo: this.email,
          subject: this.subject,
          text: this.message + '\n' + this.firstname + ' ' + this.lastname
        })
      }
      fetch('localhost:1337/email', requestOptions)
        .then(async (response) => {
          const data = await response.json()

          console.log(response)

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            this.formMessage = 'There was an error sending the message, please try again later.'
            return Promise.reject(error)
          } else {
            this.clear()
            this.formMessage = 'Your message has been sent!'
          }
        })
        .catch(() => {
          this.formMessage = 'There was an error sending the message, please try again later.'
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
  .contact.v-card__title {
    margin: 2rem 2em;
    padding: 0;
  }
  .contact-container {
    width: 100%;
    margin-top: -5%;
    padding: 10% 5%;
    background-color: #FFFF00;
    text-align: center;
  }
  .contact-container form {
    height: 100%;
  }
  .contact-container form .container {
    height: inherit;
    width: 90%;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
  }
</style>
