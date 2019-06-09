import { LitElement, html } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';

import { styles } from './styles.js';

class CommonSignUp extends LitElement {
	static get properties() {
		return {
			step: { type: Number },
      availabilities: { type: Array },
      homeId: { type: Number },
      roomNumber: { type: String },
      tennantOptions: { type: Array },
      tennantCount: { type: Number },
      moveInDate: { type: Date},
      termOptions: { type: Array },
      term: { type: Number },
      applicant1: { type: Object },
      applicant2: { type: Object },
		};
	}

  constructor() {
    super();
    this.step = 0;
    this.availabilities = [{apartment_name: 'Loading availabilities...'}];
    this.homeId = 1;
    this.roomNumber = -1;
    this.tennantOptions = [1,2];
    this.tennantCount = 1;
    this.moveInDate = new Date();
    this.termOptions = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.term = 1;
    this.applicant1 = this.blankApplicant;
    this.applicant2 = this.blankApplicant;
  }

  continue() {
    if (this.$form.checkValidity()) {
      this.step += 1;
    } else {
      [...this.shadowRoot.querySelectorAll('input')].map(input => {
        input.setAttribute('focused','');
      });
    }
  }

  get step() {
    return this._step;
  }

  set step(step) {
    if (step === this.step) return;
    const old = this.step;
    this._step = step;
    this.updateRoute();
    this.requestUpdate('step', old);
  }

  get stepAsText() {
    switch (this.step) {
      case 0:
        return 'One';
      case 1:
        return 'Two';
      case 2:
        return 'Three';
    }
  }

  updateRoute() {
    const title = `Sign up for Commone: Step ${this.stepAsText}`;
    const url = `/step-${this.stepAsText.toLowerCase()}.html`;
    if (location.pathname === url) return;
    history.pushState({}, title, url);
  }

  back() {
    this.step -= 1;
  }

  submit(e) {
    e.preventDefault();
    alert('Thanks for completing the form.')
  }

  setHomeId({target}) {
    this.homeId = Number(target.value);
  }

  setRoomNumber({target}) {
    debugger;
    this.roomNumber = target.value;
  }

  setTenantCount({target}) {
    this.tennantCount = Number(target.value);
  }

  setMoveInDate({target}) {
    const date = target.valueAsNumber + (new Date().getTimezoneOffset() * 60 * 1000);
    this.moveInDate = new Date(date);
  }

  setTerm({target}) {
    this.term = Number(target.value);
  }

  get blankApplicant() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  }

  setApplicantOne({target}) {
    this.applicant1 = {
      ...this.applicant1,
      [target.name]: target.value
    }
  }

  setApplicantTwo({target}) {
    this.applicant2 = {
      ...this.applicant2,
      [target.name]: target.value
    }
  }

  focused({target}) {
    target.setAttribute('focused','');
  }

  get roomsByHomeId() {
    const homeData = this.availabilities.filter(
        availability => availability.home_id === this.homeId
      )[0];
    return homeData ? homeData.available_rooms : ['Please select a home first.'];
  }

  get homeNameById() {
    const homeData = this.availabilities.filter(
        availability => availability.home_id === this.homeId
      )[0];
    return homeData ? homeData.apartment_name : 'Home ID not Set';
  }

	get stepOne() {
		return html`
      <fieldset>
  			<legend class="main-title">Home and term information</legend>
        <label>
          Home
          <select
            required
            @change=${this.setHomeId}
          >
            <option disabled>Select a home</option>
            ${this.availabilities.map(availability => html`
              <option
                value=${availability.home_id}
                ?selected=${this.homeId === availability.home_id}
              >${availability.apartment_name}</option>
            `)}
          </select>
        </label>
        <label>
          Room
          <select
            required
            @change=${this.setRoomNumber}
          >
            <option disabled>Select a room</option>
            ${this.roomsByHomeId.map(room => html`
              <option
                value=${room}
                ?selected=${this.roomNumber === room}
              >${room}</option>
            `)}
          </select>
        </label>
        <label>
          How many people are applying to live here?
          <select
            required
            @change=${this.setTenantCount}
          >
            <option disabled>Select a roommate count</option>
            ${this.tennantOptions.map(option => html`
              <option
                value=${option}
                ?selected=${this.tennantCount === option}
              >${option}</option>
            `)}
          </select>
        </label>
        <label>
          Desired move-in date
          <input
            required
            type="date"
            @change=${this.setMoveInDate}
            .value=${this.moveInDate.toISOString().substr(0, 10)}
          />
        </label>
        <label>
          Desired term length
          <select
            required
            @change=${this.setTerm}
          >
            <option disabled>Select a term length in months</option>
            ${this.termOptions.map(option => html`
              <option
                value=${option}
                ?selected=${this.term === option}
              >${option}</option>
            `)}
          </select>
        </label>
        <button
          class="continue"
          type="button"
          @click=${this.continue}
        >Continue</button>
      </fieldset>
    `;
  }

  getApplicantData(title, applicant, onChange) {
    return html`
      <fieldset>
        <legend class="sub-title">${title}</legend>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            required
            @change=${onChange}
            .value=${applicant.firstName}
          />
          <span>Please supply a first name</span>
        </label>
        <label>
          Last name
          <input
            type="text"
            name="lastName"
            required
            @change=${onChange}
            .value=${applicant.lastName}
          />
          <span>Please supply a last name</span>
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            @change=${onChange}
            .value=${applicant.email}
          />
          <span>Please supply a valid email address</span>
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            pattern="(1?)[0-9]{3}(-?)[0-9]{3}(-?)[0-9]{4}"
            required
            @change=${onChange}
            .value=${applicant.phone}
          />
          <span>Please supply a valid phone number</span>
        </label>
      </fieldset>
    `;
  }

  get stepTwo() {
    return html`
      <fieldset>
        <legend class="main-title">Application form</legend>
        <p>General personal information</p>
        ${this.getApplicantData(
          this.tennantCount === 2 ? 'Applicant 1' : 'Applicant',
          this.applicant1,
          this.setApplicantOne
        )}
        ${this.tennantCount === 2
          ? html`
            ${this.getApplicantData(
              'Applicant 2',
              this.applicant2,
              this.setApplicantTwo
            )}
          `
          : html ``
        }
        <button
          class="back"
          type="button"
          @click=${this.back}
        >Back</button>
        <button
          class="continue"
          type="button"
          @click=${this.continue}
        >Continue</button>
      </fieldset>
    `;
  }

  displayApplicantData(title, applicant) {
    return html`
      <dt class="main-data">${title}</dt>
      <dd>
        <p>
          ${applicant.firstName} ${applicant.lastName}<br/>
          ${applicant.email}<br/>
          ${applicant.phone}
        </p>
      </dd>
    `;
  }

  get stepThree() {
    return html`
      <fieldset>
        <legend class="main-title">Confirmation</legend>
        <dl>
          <dt class="main-data">Appartment:</dt>
          <dd>${this.homeNameById} - ${this.roomNumber}</dd>
          <dt>Applicants:</dt>
          <dd>${this.tennantCount}</dd>
          <dt>Move in:</dt>
          <dd><time datetime=${this.moveInDate}>${new Intl.DateTimeFormat('en-US').format(this.moveInDate)}</time></dd>
          <dt>Length</dt>
          <dd>${this.term} months</dd>
          ${this.displayApplicantData(
            this.tennantCount === 2 ? 'Applicant 1' : 'Applicant',
            this.applicant1
          )}
          ${this.tennantCount === 2
            ? html`
              ${this.displayApplicantData(
                'Applicant 2',
                this.applicant2
              )}
            `
            : html``
          }
        </dl>
        <button
          class="back"
          type="button"
          @click=${this.back}
        >Back</button>
        <button
          class="submit"
          type="submit"
          @click=${this.submit}
        >Submit</button>
      </fieldset>
		`;
	}

  get currentStep() {
    switch (this.step) {
      case 0:
        return this.stepOne;
      case 1:
        return this.stepTwo;
      case 2:
        return this.stepThree;
    }
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <form
        @focusout=${this.focused}
      >
        ${this.currentStep}
      </form>
    `;
  }

  firstUpdated() {
    installRouter((location) => this.route(location));
    this.$form = this.shadowRoot.querySelector('form');
    fetch('https://api.jsonbin.io/b/5cdb03f94fc34d41690069c5')
      .then(resp => resp.json())
      .then(availabilities => {
        this.availabilities = availabilities;
        this.homeId = availabilities[0].home_id;
        this.roomNumber = this.roomsByHomeId[0];
      });
  }

  route(location) {
    const paths = location.pathname.split('/');
    const route = paths[paths.length - 1];
    switch (route) {
      case 'step-three':
        this.step = 2;
        break;
      case 'step-two':
        this.step = 1;
      case 'step-one':
      default:
        this.step = 0;
        break;
    }
  }
}

customElements.define('common-sign-up', CommonSignUp);
