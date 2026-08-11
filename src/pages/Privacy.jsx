import LegalPage from './LegalPage'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what On The List collects and why, in plain
        language.
      </p>

      <h2>1. No Accounts, No Personal Info</h2>
      <p>
        There's no sign-up. We don't collect your name, email address, phone
        number, or any other personally identifying information.
      </p>

      <h2>2. Anonymous Sessions</h2>
      <p>
        To prevent spam (like the same person repeatedly reporting a venue),
        we use Supabase's anonymous authentication to assign your browser a
        random, anonymous ID. This ID isn't tied to your identity — it's
        just a way to recognize "this browser" between visits. It's stored
        in your browser and can be cleared at any time by clearing your site
        data.
      </p>

      <h2>3. What We Store</h2>
      <p>When you submit a report, we store:</p>
      <ul>
        <li>The venue you reported on</li>
        <li>The crowd level you selected</li>
        <li>The cover amount you entered (if any)</li>
        <li>A timestamp</li>
        <li>Your anonymous session ID (see above)</li>
      </ul>
      <p>
        Reports are shown to other users to compute live crowd levels and
        recent cover amounts. Reports cannot be edited or deleted once
        submitted.
      </p>

      <h2>4. Technical / Server Data</h2>
      <p>
        Like virtually every website, the infrastructure we run on
        (Supabase for the database, and our hosting provider) automatically
        logs standard technical data as part of normal operation — this can
        include your IP address, browser type, and request timestamps. We
        don't actively use this data ourselves, but it may exist in
        infrastructure-level logs maintained by these providers.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        We use <strong>Supabase</strong> for our database and anonymous
        authentication, and <strong>Vercel</strong> for hosting. Both are
        standard infrastructure providers and process data on our behalf
        under their own privacy and security practices.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        Reports are kept to power the app's crowd-level and cover features.
        If you'd like data tied to a specific anonymous session removed,
        contact us (see below) and we'll do our best to help, though since
        the data isn't tied to a real identity we may not be able to verify
        or locate it precisely.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy as the app changes. Material changes will
        be reflected here with an updated date.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about this policy? Email <strong>onthelistteam@gmail.com</strong>.
      </p>
    </LegalPage>
  )
}
