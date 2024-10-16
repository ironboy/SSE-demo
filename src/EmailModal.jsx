export default function EmailModal() {

  const s = useStates('main');

  async function sendMail(event) {
    event.preventDefault();
    s.showEmailModal = false;
    await fetch('/api/email-chat-content/' + decodeURIComponent(s.email));
  }

  return <Modal show={s.showEmailModal} onHide={() => s.showEmailModal = false}>
    <form onSubmit={sendMail}>
      <Modal.Header closeButton>
        <Modal.Title>Send an email with the chat contents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Send me an email with the chat contents:</p>
        <input className="form-control" type="email" placeholder="Email"
          {...s.bind('email')} required />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => s.showEmailModal = false}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Send email
        </Button>
      </Modal.Footer>
    </form>
  </Modal>;
}