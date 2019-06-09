import { LitElement, html } from 'lit-element';

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
    this.availabilities = [{"available_rooms":["1A","3B","4B","9C"],"apartment_name":"Baltic","home_id":1},{"available_rooms":["7C","1C","3B","4A"],"apartment_name":"Marcy","home_id":2},{"available_rooms":["5F","1A","1B","1C","3D","6B","5G"],"apartment_name":"Hamilton","home_id":3}]
    this.homeId = -1;
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
    this.step += 1;
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
  			<legend>Home and term information</legend>
        <label>
          Home
          <select
            @change=${this.setHomeId}
          >
            <option>Select a home</option>
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
            @change=${this.setRoomNumber}
            ?disabled=${this.homeId === -1}
          >
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
            @change=${this.setTenantCount}
          >
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
            type="date"
            @change=${this.setMoveInDate}
            .value=${this.moveInDate.toISOString().substr(0, 10)}
          />
        </label>
        <label>
          Desired term length
          <select
            @change=${this.setTerm}
          >
            ${this.termOptions.map(option => html`
              <option
                value=${option}
                ?selected=${this.term === option}
              >${option}</option>
            `)}
          </select>
        </label>
        <button
          type="button"
          @click=${this.continue}
        >Continue</button>
      </fieldset>
    `;
  }

  get stepTwo() {
    return html`
      <fieldset>
        <legend>Application form</legend>
        <p>General personal information</p>
        <fieldset>
          ${this.tennantCount === 2
            ? html`
              <legend>Applicant 1</legend>
            `
            : html`
              <legend>Applicant</legend>
            `
          }
          <label>
            First name
            <input
              type="text"
              name="firstName"
              @change=${this.setApplicantOne}
              .value=${this.applicant1.firstName}
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              name="lastName"
              @change=${this.setApplicantOne}
              .value=${this.applicant1.lastName}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              @change=${this.setApplicantOne}
              .value=${this.applicant1.email}
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              @change=${this.setApplicantOne}
              .value=${this.applicant1.phone}
            />
          </label>
        </fieldset>
        ${this.tennantCount === 2
          ? html`
            <fieldset>
              <legend>Applicant 2</legend>
              <label>
                First name
                <input
                  type="text"
                  name="firstName"
                  @change=${this.setApplicantTwo}
                  .value=${this.applicant2.firstName}
                />
              </label>
              <label>
                Last name
                <input
                  type="text"
                  name="lastName"
                  @change=${this.setApplicantTwo}
                  .value=${this.applicant2.lastName}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  @change=${this.setApplicantTwo}
                  .value=${this.applicant2.email}
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  @change=${this.setApplicantTwo}
                  .value=${this.applicant2.phone}
                />
              </label>
            </fieldset>
          `
          : html ``
        }
        <button
          type="button"
          @click=${this.back}
        >Back</button>
        <button
          type="button"
          @click=${this.continue}
        >Continue</button>
      </fieldset>
    `;
  }

  get stepThree() {
    return html`
      <fieldset>
        <legend>Confirmation</legend>
        <dl>
          <dt>Appartment:</dt>
          <dd>${this.homeNameById} - ${this.roomNumber}</dd>
          <dt>Applicants:</dt>
          <dd>${this.tennantCount}</dd>
          <dt>Move in:</dt>
          <dd><time datetime=${this.moveInDate}>${new Intl.DateTimeFormat('en-US').format(this.moveInDate)}</time></dd>
          <dt>Length</dt>
          <dd>${this.term} months</dd>
          ${this.tennantCount === 2
            ? html`
              <dt>Applicant 1</dt>
            `
            : html`
              <dt>Applicant</dt>
            `
          }
          <dd>
            <p>
              ${this.applicant1.firstName} ${this.applicant1.lastName}<br/>
              ${this.applicant1.email}<br/>
              ${this.applicant1.phone}
            </p>
          </dd>
          ${this.tennantCount === 2
            ? html`
              <dt>Applicant 2</dt>
              <dd>
                <p>
                  ${this.applicant2.firstName} ${this.applicant2.lastName}<br/>
                  ${this.applicant2.email}<br/>
                  ${this.applicant2.phone}
                </p>
              </dd>
            `
            : html``
          }
        </dl>
        <button
          type="button"
          @click=${this.back}
        >Back</button>
        <button
          type="submit"
          @click=${this.submit}
        >Submit</button>
      </fieldset>
		`;
	}

  render() {
    switch (this.step) {
      case 0:
        return this.stepOne;
      case 1:
        return this.stepTwo;
      case 2:
        return this.stepThree;
    }
  }
}

customElements.define('common-sign-up', CommonSignUp);
